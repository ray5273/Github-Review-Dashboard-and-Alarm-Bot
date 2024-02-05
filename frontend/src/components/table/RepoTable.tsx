import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import {Repos} from "../../../../shared/src/db/entity/repo.entity";
import axios, {AxiosResponse} from "axios";



interface RepoTableColumnPinningProps {
    rows: Repos[];
}

export default function RepoTableColumnPinning({rows}: RepoTableColumnPinningProps) {
    const handleDelete = (id: number) => () => {
        axios.delete(`${process.env.REACT_APP_DB_API_SERVER}/repos/${id}`)
            .then((response: AxiosResponse) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Sheet
                variant="outlined"
                sx={{
                    '--TableCell-height': '40px',
                    // the number is the amount of the header rows.
                    '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                    '--Table-firstColumnWidth': '80px',
                    '--Table-lastColumnWidth': '144px',
                    // background needs to have transparency to show the scrolling shadows
                    '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
                    '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
                    overflow: 'auto',
                    background: (
                        theme,
                    ) => `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
            linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 70%) 0 100%,
            radial-gradient(
              farthest-side at 0 50%,
              rgba(0, 0, 0, 0.12),
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(
                farthest-side at 100% 50%,
                rgba(0, 0, 0, 0.12),
                rgba(0, 0, 0, 0)
              )
              0 100%`,
                    backgroundSize:
                        '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'local, local, scroll, scroll',
                    backgroundPosition:
                        'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                    backgroundColor: 'background.surface',
                }}
            >
                <Table
                    borderAxis="bothBetween"
                    stripe="odd"
                    hoverRow
                    sx={{
                        '& tr > *:first-child': {
                            position: 'sticky',
                            left: 0,
                            boxShadow: '1px 0 var(--TableCell-borderColor)',
                            bgcolor: 'background.surface',
                        },
                        '& tr > *:last-child': {
                            position: 'sticky',
                            right: 0,
                            bgcolor: 'var(--TableCell-headBackground)',
                        },
                    }}
                >
                    <thead>
                    <tr>
                        <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Number</th>
                        <th style={{ width: 200 }}>Owner</th>
                        <th style={{ width: 200 }}>Repository Name&nbsp;</th>
                        <th style={{ width: 200 }}>Internal Repository&nbsp;</th>
                        <th style={{ width: 200 }}>Delete&nbsp;</th>
                        <th
                            aria-label="last"
                            style={{ width: 'var(--Table-lastColumnWidth)' }}
                        />
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row) => (
                        <tr key={row.name}>
                            <td>{row.id}</td>
                            <td>{row.owner}</td>
                            <td>{row.name}</td>
                            <td>{row.is_internal.toString()}</td>
                            <td>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button size="sm" variant="soft" color="danger"onClick={handleDelete(row.id)}>
                                        Delete
                                    </Button>
                                </Box>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </Sheet>
        </Box>
    );
}