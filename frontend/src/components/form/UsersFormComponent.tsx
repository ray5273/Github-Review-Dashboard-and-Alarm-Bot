// UsersFormComponent.tsx
import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {Users} from "../../../../shared/src/db/entity/user.entity";
import FormControl from "@mui/joy/FormControl";
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from "@mui/joy/Button";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";

interface UsersFormComponentProps {
    setData: React.Dispatch<React.SetStateAction<Users[] | []>>
}

export const UsersFormComponent: React.FC<UsersFormComponentProps> = ({ setData }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('name');
        const github_id = data.get('github_id');
        const company_id = data.get('company_id');
        const company_github_id = data.get('company_github_id');
        const team_name = data.get('team_name');

        const body = {
            name: username,
            github_id: github_id,
            company_id: company_id,
            company_github_id: company_github_id,
            team_name: team_name
        }
        await axios.post(`${process.env.REACT_APP_DB_API_SERVER}/users`, body)
            .then((res : AxiosResponse<Users[]>) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl
                id="Id"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Add user data
                </FormLabel>
                <Input name='name' placeholder="Username"></Input>
            </FormControl>
            <FormControl
                id="GithubId"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Public Github ID
                </FormLabel>
                <Input name='github_id' placeholder="Public Github ID"></Input>
            </FormControl>
            <FormControl
                id="CompanyId"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Company ID
                </FormLabel>
                <Input name='company_id' placeholder="Company ID"></Input>
            </FormControl>
            <FormControl
                id="CompanyGithubId"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Company Github ID
                </FormLabel>
                <Input name='company_github_id' placeholder="Company Github ID"></Input>
            </FormControl>
            <FormControl
                id="TeamName"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Team Name
                </FormLabel>
                <RadioGroup name='team_name' defaultValue="ORC">
                    <Radio value='ORC' label={'ORC Task'} />
                    <Radio value='IOW' label={'IOW Task'} />
                    <Radio value='PB' label={'PB Task'} />
                    <Radio value='SRE' label={'SRE Task'} />
                    <Radio value='CEPH' label={'CEPH Task'} />
                </RadioGroup>
            </FormControl>
            <Button variant="solid" type="submit">Create</Button>
        </form>
    );
}