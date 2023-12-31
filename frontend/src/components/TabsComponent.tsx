// TabsComponent.tsx
import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

interface TabsComponentProps {
    setPlacement: React.Dispatch<React.SetStateAction<'users' | 'repos'>>
}

export const TabsComponent: React.FC<TabsComponentProps> = ({ setPlacement }) => {
    return (
        <Tabs defaultValue="top" onChange={(e, value ) => {
            if (value === 'users' || value === 'repos') {
                setPlacement(value)
            }
        }}>
            <TabList underlinePlacement="bottom">
                <Tab value="users" indicatorPlacement="top">
                    유저 테이블
                </Tab>
                <Tab value="repos" indicatorPlacement="top">
                    리포지토리 테이블
                </Tab>
            </TabList>
            <TabPanel value="users">
                유저 데이터 변경 테이블 입니다.
            </TabPanel>
            <TabPanel value="repos">
                리포지토리 데이터 변경 테이블 입니다.
            </TabPanel>
        </Tabs>
    );
}
