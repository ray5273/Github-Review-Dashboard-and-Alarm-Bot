import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import {ChannelRepoAlarm} from "../../../../shared/src/db/entity/channel.repo.alarm.entity";
import axios, {AxiosResponse} from "axios";


interface ChannelRepoAlarmTableColumnPinningProps {
    rows: ChannelRepoAlarm[],
    setPlacement: React.Dispatch<React.SetStateAction<'users' | 'repos' | 'user_repo_alarm' | 'channel_repo_alarm'>>

}

export default function ChannelRepoAlarmTableColumnPinning({rows, setPlacement}: ChannelRepoAlarmTableColumnPinningProps) {
    const handleDelete = (channel_id:string, repo_id: string) => () => {
        console.log(channel_id, repo_id)
        axios.delete(`${process.env.REACT_APP_DB_API_SERVER}/channel-repo-alarm/${channel_id}/${repo_id}`)
            .then((response: AxiosResponse) => {
                console.log(response);
                setPlacement('users')
            })
            .catch((error) => {
                console.log(error);
            });
    }
    if (!Array.isArray(rows)) return <div>Loading...</div>
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
                        <th style={{width: 'var(--Table-firstColumnWidth)'}}>Number</th>
                        <th style={{width: 200}}>Channel Name</th>
                        <th style={{width: 200}}>Channel ID</th>
                        <th style={{width: 200}}>Repository ID &nbsp;</th>
                        <th style={{width: 200}}>Repository owner&nbsp;</th>
                        <th style={{width: 200}}>Repository name&nbsp;</th>
                        <th style={{width: 200}}>Delete&nbsp;</th>
                        <th
                            aria-label="last"
                            style={{width: 'var(--Table-lastColumnWidth)'}}
                        />
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((item, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.channel_name}</td>
                            <td>{item.channel_id}</td>
                            <td>{item.repo_id}</td>
                            <td>{item.repo_owner}</td>
                            <td>{item.repo_name}</td>
                            <td>
                                <Box sx={{display: 'flex', gap: 1}}>
                                    <Button size="sm" variant="soft" color="danger"
                                            onClick={handleDelete(item.channel_id, String(item.repo_id))}>
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