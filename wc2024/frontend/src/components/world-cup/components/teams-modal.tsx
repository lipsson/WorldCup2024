import { TeamsType } from '../types/types'
import { Box, Button, ButtonGroup, CircularProgress, Dialog, DialogActions, DialogTitle, Grid, IconButton, Paper, Typography } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';

import _ from 'lodash';
import { useEffect, useState } from 'react';
import { ApiErrorType } from '../../../common/api/query-client';
import { useNewResultMutation } from '../api/use-new-result-mutation';
import { useArchiveResultMutation } from '../api/use-archive-result-mutation';
import { useResetResultMutation } from '../api/use-reset-result-mutation';
import { useQueryClient } from '@tanstack/react-query';
import { useAllTeamsListQuery } from '../api/use-all-teams-list.query';
import { ArchiveAccordion } from './archive/archive-accordion';

type TeamsModalType = {
    cup: number;
    cupName: string;
    onClose: () => void
}
export const TeamsModal = (props: TeamsModalType) => {
    const { cup = 1, cupName, onClose } = props;

    const client = useQueryClient();
    const { data: teams, isLoading } = useAllTeamsListQuery(cup);

    const [isStart, setIsStart] = useState<boolean>(false)
    const [pause, setPause] = useState<boolean>(true)
    const [time, setTime] = useState<number>(90)

    const [matches, setMatches] = useState<TeamsType[][]>(_.chunk(teams || [], 2));

    const addNewResultMutation = useNewResultMutation(cup);
    const addArchiveResultMutation = useArchiveResultMutation(cup);
    const resetResultMutation = useResetResultMutation(cup);

    const handleClose = () => {
        onClose()
    };

    const handleStart = () => {
        setIsStart(true)
        setPause(false)
    };

    const handleStop = () => {
        setPause(true)
    };

    const handleReset = () => {
        setTime(90)
        setIsStart(false)
        setPause(false)
        resetResultMutation.mutate({
            onSuccess: async () => {
                client.invalidateQueries(['all-teams-list'])
            },
            onError: async (error: ApiErrorType) => console.log(error)

        });
        handleClose()
    }


    const handlScore = (score: number) => {
        addNewResultMutation.mutate(score, {
            onSuccess: async () => {
                client.invalidateQueries(['all-teams-list'])
            },
            onError: async (error: ApiErrorType) => console.log(error)

        });
    }

    const handleSave = () => {
        matches.forEach(match => {
            if (match[0] && match[1]) {
                const data = { home: match[0]?.id, guest: match[1]?.id }
                addArchiveResultMutation.mutate(data, {
                    onSuccess: async () => {
                        handleReset();
                    },
                    onError: async (error: ApiErrorType) => console.log(error)

                });
            }
        })
    };

    useEffect(() => {
        if (teams?.length) {
            if (isStart && !pause && time > 0) setTimeout(() => {
                setTime(prevTime => prevTime - 1);
                if (time !== 90 && time % 10 === 0) {
                    const score = Math.floor((Math.random() * teams?.length) + 1)
                    handlScore(score)
                }
            }, 1000);
            setMatches(_.chunk(teams || [], 2));
        }
    }, [time, isStart, pause, teams])



    if (!teams || isLoading) {
        return (
            <Box>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Dialog maxWidth={'lg'} fullWidth onClose={handleClose} open>
            <DialogTitle>
                <Typography>{`${cupName} matches:`}</Typography>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}

                >
                    <CancelIcon data-testid={`modal-teams-close-icon`} />
                </IconButton>
            </DialogTitle>


            {matches.map(match => {
                return (
                    <Paper key={`${match[0]?.id}-${match[1]?.id}`} data-testid={`modal-match-${match[0]?.id}-${match[1]?.id}`} elevation={1} sx={{ m: 1, py: 2, fontFamily: '', fontWeight: 700 }}>
                        <Grid container spacing={2} direction="row"
                            justifyContent="center"
                            alignItems="center" sx={{ textAlign: 'center', }} key={match[0]?.id}>
                            <Grid item xs={5}>{match[0]?.name}</Grid>
                            <Grid item xs={2}>vs</Grid>
                            <Grid item xs={5}>{match[1]?.name}</Grid>
                            <Grid item xs={5}>{match[0]?.score}</Grid>
                            <Grid item xs={2}>:</Grid>
                            <Grid item xs={5}>{match[1]?.score}</Grid>
                            <Grid item xs={5} >
                                {match[0] && match[1] && <ArchiveAccordion id={match[0]?.id} name={match[0]?.name} guest={match[1]?.name} archive={match[0].archiveMatches} />}
                            </Grid>
                            <Grid item xs={2}></Grid>
                            <Grid item xs={5}>
                                {match[0] && match[1] && <ArchiveAccordion id={match[1]?.id} name={match[1]?.name} guest={match[0]?.name} archive={match[1].archiveMatches} />}
                            </Grid>
                        </Grid>

                    </Paper>
                )
            })}
            <DialogActions>
                {isStart && <Typography>{`Remaing Time: ${time} s`}</Typography>}
                <ButtonGroup data-testid={'modal-matchbuttons'} variant="contained" aria-label="outlined primary button group">
                    <Button autoFocus onClick={handleStart} disabled={time === 0}>
                        Start
                    </Button>
                    <Button onClick={handleStop} disabled={!isStart || time === 0}>
                        Stop
                    </Button>
                    <Button onClick={handleSave} disabled={time === 0 || !pause}>
                        Save
                    </Button>
                    <Button onClick={handleReset}>
                        Reset
                    </Button>
                </ButtonGroup>
            </DialogActions>


        </Dialog>
    )
}
