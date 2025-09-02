// src/pages/Agendamento/index.tsx
import { useState } from "react";
import { useTheme } from "styled-components";
import { Button } from "../../../components/Button";
import { MdAdd, MdCalendarToday, MdPerson, MdSchool } from "react-icons/md";
import {
    Container,
    Header,
    HeaderInfo,
    HeaderTitle,
    HeaderSubtitle,
    Body,
    StatsGrid,
    StatCard,
    StatCardHeader,
    StatCardTitle,
    StatCardContent,
    StatCardValue,
    StatCardDescription,
    UpcomingClasses,
    ClassItem,
    ClassItemInfo,
    ClassItemDetails,
    Badge,
} from "./styles";
import type { Aula } from "../../../@types/Agendamento";
import { useNavigate } from "react-router-dom";

// Mock de dados para as aulas agendadas
const upcomingClasses: Aula[] = [
    {
        id: 1,
        aluno: "Ana Silva",
        professor: "Prof. João Santos",
        disciplina: "Matemática",
        data: "2024-08-15",
        hora: "14:00",
        status: "confirmed",
    },
    {
        id: 2,
        aluno: "Carlos Oliveira",
        professor: "Prof. Maria Costa",
        disciplina: "Física",
        data: "2024-08-15",
        hora: "16:00",
        status: "pending",
    },
];

export const Agendamento = () => {
    const navigate = useNavigate(); // 3. Inicialize o hook
    const theme = useTheme();


    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Sistema de Agendamento</HeaderTitle>
                    <HeaderSubtitle>Gerencie aulas e horários de forma simples</HeaderSubtitle>
                </HeaderInfo>
                <Button onClick={() => navigate('/agendamento/novo')} borderRadius="sm" size="md">
                    <MdAdd size={20} style={{ marginRight: '8px' }} />
                    Nova Aula
                </Button>
            </Header>

            <Body>
                <StatsGrid>
                    {/* Cards de Estatísticas */}
                    <StatCard>
                        <StatCardHeader>
                            <StatCardTitle>Aulas Hoje</StatCardTitle>
                            <MdCalendarToday />
                        </StatCardHeader>
                        <StatCardContent>
                            <StatCardValue>3</StatCardValue>
                            <StatCardDescription>2 confirmadas, 1 pendente</StatCardDescription>
                        </StatCardContent>
                    </StatCard>
                    <StatCard>
                        <StatCardHeader>
                            <StatCardTitle>Professores Ativos</StatCardTitle>
                            <MdSchool />
                        </StatCardHeader>
                        <StatCardContent>
                            <StatCardValue>12</StatCardValue>
                            <StatCardDescription>Disponíveis para agendamento</StatCardDescription>
                        </StatCardContent>
                    </StatCard>
                    <StatCard>
                        <StatCardHeader>
                            <StatCardTitle>Alunos Cadastrados</StatCardTitle>
                            <MdPerson />
                        </StatCardHeader>
                        <StatCardContent>
                            <StatCardValue>48</StatCardValue>
                            <StatCardDescription>+5 este mês</StatCardDescription>
                        </StatCardContent>
                    </StatCard>
                </StatsGrid>

                <UpcomingClasses>
                    <h2>Próximas Aulas</h2>
                    {upcomingClasses.map((classItem) => (
                        <ClassItem key={classItem.id}>
                            <ClassItemInfo>
                                <span>{classItem.aluno}</span>
                                <small>{classItem.professor}</small>
                            </ClassItemInfo>
                            <ClassItemDetails>
                                <Badge>{classItem.disciplina}</Badge>
                                <span>{new Date(classItem.data).toLocaleDateString("pt-BR")}</span>
                                <span>{classItem.hora}</span>
                                <Badge
                                    style={{
                                        backgroundColor: classItem.status === "confirmed" ? theme.COLORS.success : theme.COLORS.warning,
                                        color: theme.COLORS.white,
                                    }}
                                >
                                    {classItem.status === "confirmed" ? "Confirmada" : "Pendente"}
                                </Badge>
                            </ClassItemDetails>
                        </ClassItem>
                    ))}
                </UpcomingClasses>
            </Body>
        </Container>
    );
};