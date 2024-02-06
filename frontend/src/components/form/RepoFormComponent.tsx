// FormComponent.tsx
import React from 'react';
import axios, {AxiosResponse} from 'axios';
import {Repos} from "../../../../shared/src/db/entity/repo.entity";
import FormControl from "@mui/joy/FormControl";
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from "@mui/joy/Button";
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';

interface RepoFormComponentProps {
    setData: React.Dispatch<React.SetStateAction<Repos[] | []>>
}

export const RepoFormComponent: React.FC<RepoFormComponentProps> = ({ setData }) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const owner = data.get('owner');
        const repo = data.get('repo');
        const internal = data.get('internal');
        var is_internal = false;
        if (internal === 'true') {
            is_internal = true;
        }
        const body = {
            owner: owner,
            name: repo,
            is_internal: is_internal
        }
        await axios.post(`${process.env.REACT_APP_DB_API_SERVER}/repos`, body)
            .then((res : AxiosResponse<Repos[]>) => {
                setData(res.data);
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl
                id="Owner"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Repository Owner
                </FormLabel>
                <Input name='owner' placeholder="Owner"></Input>
            </FormControl>
            <FormControl
                id="Repo"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Repository Name
                </FormLabel>
                <Input name='repo' placeholder="Repository Name"></Input>
            </FormControl>
            <FormControl
                id="Internal"
                required
                size="sm"
                color="primary"
                sx={{ mt: 4, width: 400 }}>
                <FormLabel>
                    Internal/External Repository
                </FormLabel>
                <RadioGroup name='internal' defaultValue="true">
                    <Radio value='true' label={'Internal Repository'} />
                    <Radio value='false' label={'External Repository'} />
                </RadioGroup>
            </FormControl>
            <Button variant="solid" type="submit">Create</Button>
        </form>
    );
}