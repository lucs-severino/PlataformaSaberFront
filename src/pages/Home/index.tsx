import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Body, BodyRow, Container, Header, HeaderActions, HeaderFilter, HeaderInfo, HeaderSubtitle, HeaderTitle, InformationCard, InformationCardContent, InformationCardContentLabel, InformationCardContentValue, Loading, ChartContainer, ContentWrapper } from "./styles";
import SelectInput from "../../components/SelectInput";
import { ScaleLoader } from "react-spinners";
import { FcCalendar, FcClock, FcOk, FcCancel, FcBusinessman } from "react-icons/fc";
import { Button } from "../../components/Button";
import { MdAdd } from "react-icons/md";
import { getAlunosPorMes, getDashboardAgendamentos, getTotalAlunos, getAulasPorPeriodo } from "../../services/requests";
import type { DashboardData } from "../../@types/Agendamento";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, 
  Title,
  Tooltip,
  Legend
);


export const Home = () => {
    const [loadingRequest, setLoadingRequest] = useState(true);
    const [monthSelected, setMonthSelected] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear().toString());
    const [dataDashboard, setDataDashboard] = useState<DashboardData | null>(null);
    const [totalAlunos, setTotalAlunos] = useState(0);
    const [studentChartData, setStudentChartData] = useState<any>(null);
    const [aulasChartData, setAulasChartData] = useState<any>(null);

    const theme = useTheme();
    const navigate = useNavigate();

    const handleMonthSelected = (e: { target: { value: string } }) => setMonthSelected(e.target.value);
    const handleYearSelected = (e: { target: { value: string } }) => setYearSelected(e.target.value);

    const getYears = () => {
        const years = [];
        for (let year = 2024; year <= new Date().getFullYear(); year++) {
            years.push({ label: year.toString(), value: year.toString() });
        }
        return years;
    };

    const getMonths = () => {
        return Array.from({ length: 12 }, (_, index) => ({
            value: (index + 1).toString().padStart(2, '0'),
            label: new Date(new Date().getFullYear(), index, 1).toLocaleString('pt-BR', { month: 'long' })
        }));
    };

    const handleGetDashboardData = async () => {
        setLoadingRequest(true);
        const [
            dashboardResponse,
            chartResponse,
            totalAlunosResponse,
            aulasPorPeriodoResponse
        ] = await Promise.all([
            getDashboardAgendamentos(monthSelected, yearSelected),
            getAlunosPorMes(yearSelected),
            getTotalAlunos(),
            getAulasPorPeriodo(monthSelected, yearSelected) 
        ]);

        if (dashboardResponse.data) setDataDashboard(dashboardResponse.data);
        if (totalAlunosResponse.data) setTotalAlunos(totalAlunosResponse.data.total);

        if (chartResponse.data) {
            const chartLabels = chartResponse.data.map((d: any) => d.mes);
            setStudentChartData({
                labels: chartLabels,
                datasets: [
                    { label: 'Total', data: chartResponse.data.map((d: any) => d.total), borderColor: theme.COLORS.primary, fill: false, tension: 0.4 },
                    { label: 'Ativos', data: chartResponse.data.map((d: any) => d.ativos), borderColor: theme.COLORS.success, fill: false, tension: 0.4 },
                    { label: 'Inativos', data: chartResponse.data.map((d: any) => d.inativos), borderColor: theme.COLORS.danger, fill: false, tension: 0.4 }
                ],
            });
        }

        if (aulasPorPeriodoResponse.data) {
            const data = aulasPorPeriodoResponse.data;
            const diasAbreviados: { [key: string]: string } = { "segunda-feira": "Seg", "terça-feira": "Ter", "quarta-feira": "Qua", "quinta-feira": "Qui", "sexta-feira": "Sex", "sábado": "Sáb", "domingo": "Dom" };
            const labels = data.map(d => diasAbreviados[d.diaDaSemana.toLowerCase()] || d.diaDaSemana);
            
            setAulasChartData({
                labels,
                datasets: [
                    { label: 'Manhã', data: data.map(d => d.manha), backgroundColor: '#3b82f6' },
                    { label: 'Tarde', data: data.map(d => d.tarde), backgroundColor: '#f59e0b' },
                    { label: 'Noite', data: data.map(d => d.noite), backgroundColor: theme.COLORS.primary },
                ]
            });
        }

        setLoadingRequest(false);
    };

    useEffect(() => {
        handleGetDashboardData();
    }, [monthSelected, yearSelected]);

    return (
        <Container>
            <Header>
                <HeaderInfo>
                    <HeaderTitle>Convergência Musical</HeaderTitle>
                    <HeaderSubtitle>Acompanhe os agendamentos e filtre por mês e ano com facilidade!</HeaderSubtitle>
                </HeaderInfo>

                <HeaderActions>
                    <HeaderFilter>
                        <SelectInput value={monthSelected} options={getMonths()} onChange={handleMonthSelected} />
                        <SelectInput value={yearSelected} options={getYears()} onChange={handleYearSelected} />
                    </HeaderFilter>
                    <Button onClick={() => navigate('/agendamento/novo')} size="md">
                        <MdAdd size={20} style={{ marginRight: '8px' }} />
                        Agendar Aula
                    </Button>
                </HeaderActions>
            </Header>

            {loadingRequest ? <Loading><ScaleLoader color={theme.COLORS.primary} /></Loading> : (
                <Body>
                    <ContentWrapper>
                        <BodyRow>
                             <InformationCard>
                                 <FcBusinessman size={32} />
                                 <InformationCardContent>
                                     <InformationCardContentValue>{totalAlunos}</InformationCardContentValue>
                                     <InformationCardContentLabel>Total de Alunos Ativos</InformationCardContentLabel>
                                 </InformationCardContent>
                             </InformationCard>
                            
                            <InformationCard $isClickable onClick={() => navigate('/agendamento')}>
                                <FcCalendar size={32} />
                                <InformationCardContent>
                                    <InformationCardContentValue>{dataDashboard?.total}</InformationCardContentValue>
                                    <InformationCardContentLabel>Aulas Agendadas</InformationCardContentLabel>
                                </InformationCardContent>
                            </InformationCard>

                            <InformationCard $isClickable onClick={() => navigate('/agendamento?status=Agendado')}>
                                <FcClock size={32} />
                                <InformationCardContent>
                                    <InformationCardContentValue>{dataDashboard?.pendentes}</InformationCardContentValue>
                                    <InformationCardContentLabel>Aulas Pendentes!</InformationCardContentLabel>
                                </InformationCardContent>
                            </InformationCard>

                            <InformationCard $isClickable onClick={() => navigate('/agendamento?status=Confirmado')}>
                                <FcOk size={32} />
                                <InformationCardContent>
                                    <InformationCardContentValue>{dataDashboard?.confirmadas}</InformationCardContentValue>
                                    <InformationCardContentLabel>Aulas Concluídas!</InformationCardContentLabel>
                                </InformationCardContent>
                            </InformationCard>

                            <InformationCard $isClickable onClick={() => navigate('/agendamento?status=Cancelado')}>
                                <FcCancel size={32} />
                                <InformationCardContent>
                                    <InformationCardContentValue>{dataDashboard?.canceladas}</InformationCardContentValue>
                                    <InformationCardContentLabel>Aulas Canceladas</InformationCardContentLabel>
                                </InformationCardContent>
                            </InformationCard>
                        </BodyRow>

                        {aulasChartData && (
                            <ChartContainer>
                                <Bar options={{ responsive: true, plugins: { legend: { position: 'top' as const }, title: { display: true, text: `Aulas por Período do Dia` }}, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }}}}} data={aulasChartData} />
                            </ChartContainer>
                        )}

                        {studentChartData && (
                            <ChartContainer>
                                 <Line options={{ responsive: true, plugins: { legend: { position: 'top' as const }, title: { display: true, text: `Alunos Cadastrados em ${yearSelected}` }}, scales: { y: { beginAtZero: true }}}} data={studentChartData} />
                            </ChartContainer>
                        )}

                    </ContentWrapper>
                </Body>
            )}
        </Container>
    );
};