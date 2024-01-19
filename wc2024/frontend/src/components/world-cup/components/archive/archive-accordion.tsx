import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import { ArchiveMatches } from 'components/world-cup/types/types'
import { FC } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const ArchiveAccordion: FC<{ id: number, name: string, guest: string, archive: ArchiveMatches[] }> = ({ id, name, archive, guest }) => {
    return (
        <Accordion sx={{ m: 2 }} disabled={archive.length === 0}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id={`${id}`}
            >
                <Typography>{`${name} archive matches`}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ m: 2 }}>
                {archive && archive.map(archive1 => (
                    <Typography key={archive1.id}>{`With ${guest} with score: ${archive1.score}`}</Typography>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}




