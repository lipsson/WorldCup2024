
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useWorldCupsListQuery } from '../api/use-world-cups-list.query';
import { Box, CircularProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import { TeamsType } from '../types/types';
import { TeamsModal } from '../components/teams-modal';

export const WorldCup = () => {
    const { data, isLoading } = useWorldCupsListQuery();
    const [teams, setTeams] = useState<TeamsType[] | null>(null);
    const [cup, setCup] = useState<number | null>(null);
    const [cupName, setCupName] = useState<string>('');

    const columns: GridColDef[] = [
        { field: 'uid', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 150,
            editable: true,
        },
        {
            field: 'year',
            headerName: 'Year',
            width: 150,
            editable: true,
        },
        {
            field: 'options',
            headerName: 'Details',
            type: 'actions',
            width: 100,
            headerAlign: 'center',
            align: 'center',
            getActions: ({ row }) => [
                <GridActionsCellItem
                    key={`${row.uid}-edit`}
                    label={'Details'}
                    icon={<InfoIcon />}
                    onClick={
                        () => {
                            setTeams(row.teams)
                            setCup(row.uid)
                            setCupName(`${row.name} ${row.year}`)
                        }
                    }
                    showInMenu={false}
                />,
            ],
        },
    ];

    const handleClose = () => {
        setTeams(null);
        setCup(null);
        setCupName('')
    }

    if (!data || isLoading) {
        return (
            <Box>
                <CircularProgress />
            </Box>
        );
    }


    return (
        <>
            <DataGrid
                rows={data || []}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                getRowId={(row) => row.uid}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
            {teams !== null && cup !== null && <TeamsModal cup={cup} cupName={cupName} onClose={handleClose} />}
        </>

    )
}