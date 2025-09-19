import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Body, BodyRow, Container, Header, HeaderActions, HeaderFilter, HeaderInfo, HeaderSubtitle, HeaderTitle, InformationCard, InformationCardContent, InformationCardContentLabel, InformationCardContentValue, Loading, ChartContainer } from "./styles";
import SelectInput from "../../components/SelectInput";
import { ScaleLoader } from "react-spinners";
import { FcCalendar, FcClock, FcOk, FcCancel, FcBusinessman } from "react-icons/fc";
import { Button } from "../../components/Button";
import { MdAdd } from "react-icons/md";
import { getAlunosPorMes, getDashboardAgendamentos, getTotalAlunos } from "../../services/requests";
import type { DashboardData } from "../../@types/Agendamento";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
        const monthsArray = Array.from({ length: 12 }, (_, index) => {
            const date = new Date(new Date().getFullYear(), index, 1);
            return {
                value: (index + 1).toString().padStart(2, '0'),
                label: date.toLocaleString('pt-BR', { month: 'long' })
            };
        });
        return monthsArray;
    };

    const handleGetDashboardData = async () => {
        setLoadingRequest(true);
        const [dashboardResponse, chartResponse, totalAlunosResponse] = await Promise.all([
            getDashboardAgendamentos(monthSelected, yearSelected),
            getAlunosPorMes(yearSelected),
            getTotalAlunos()
        ]);

        if (dashboardResponse.data) {
            setDataDashboard(dashboardResponse.data);
        }

        if (totalAlunosResponse.data) {
            setTotalAlunos(totalAlunosResponse.data.total);
        }

        if (chartResponse.data) {
            const chartLabels = chartResponse.data.map((d: any) => d.mes);
            const chartValues = chartResponse.data.map((d: any) => d.quantidade);

            setStudentChartData({
                labels: chartLabels,
                datasets: [
                    {
                        label: 'Novos Alunos',
                        data: chartValues,
                        borderColor: theme.COLORS.primary,
                        backgroundColor: `${theme.COLORS.primary}80`, // Cor com transparência
                        tension: 0.4, // Para deixar as linhas curvas
                    },
                ],
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
                    <HeaderTitle>Aulas</HeaderTitle>
                    <HeaderSubtitle>Acompanhe o agendamentos e filtre por mês e ano com facilidade!</HeaderSubtitle>
                </HeaderInfo>

                <HeaderActions>
                    <HeaderFilter>
                        <SelectInput
                            value={monthSelected}
                            options={getMonths()}
                            onChange={handleMonthSelected}
                        />
                        <SelectInput
                            value={yearSelected}
                            options={getYears()}
                            onChange={handleYearSelected}
                        />
                    </HeaderFilter>
                    <Button onClick={() => navigate('/agendamento/novo')} size="md">
                        <MdAdd size={20} style={{ marginRight: '8px' }} />
                        Agendar Aula
                    </Button>
                </HeaderActions>
            </Header>

            {loadingRequest ? (
                <Loading>
                    <ScaleLoader color={theme.COLORS.primary} />
                </Loading>
            ) : (
                <Body>
                    <BodyRow>
                        <InformationCard>
                             <FcBusinessman size={32} />
                             <InformationCardContent>
                                 <InformationCardContentValue>
                                     {totalAlunos}
                                 </InformationCardContentValue>
                                 <InformationCardContentLabel>
                                    Total de Alunos
                                 </InformationCardContentLabel>
                             </InformationCardContent>
                         </InformationCard>
                        
                        <InformationCard $isClickable onClick={() => navigate('/agendamento')}>
                            <FcCalendar size={32} />
                            <InformationCardContent>
                                <InformationCardContentValue>
                                    {dataDashboard?.total}
                                </InformationCardContentValue>
                                <InformationCardContentLabel>
                                   Aulas Agendadas
                                </InformationCardContentLabel>
                            </InformationCardContent>
                        </InformationCard>

                        <InformationCard $isClickable onClick={() => navigate('/agendamento?status=Agendado')}>
                            <FcClock size={32} />
                            <InformationCardContent>
                                <InformationCardContentValue>
                                    {dataDashboard?.pendentes}
                                </InformationCardContentValue>
                                <InformationCardContentLabel>
                                    Aulas Pendentes!
                                </InformationCardContentLabel>
                            </InformationCardContent>
                        </InformationCard>

                        <InformationCard $isClickable onClick={() => navigate('/agendamento?status=Confirmado')}>
                            <FcOk size={32} />
                            <InformationCardContent>
                                <InformationCardContentValue>
                                    {dataDashboard?.confirmadas}
                                </InformationCardContentValue>
                                <InformationCardContentLabel>
                                    Aulas Concluídas!
                                </InformationCardContentLabel>
                            </InformationCardContent>
                        </InformationCard>

                        <InformationCard $isClickable onClick={() => navigate('/agendamento?status=Cancelado')}>
                            <FcCancel size={32} />
                            <InformationCardContent>
                                <InformationCardContentValue>
                                    {dataDashboard?.canceladas}
                                </InformationCardContentValue>
                                <InformationCardContentLabel>
                                    Aulas Canceladas
                                </InformationCardContentLabel>
                            </InformationCardContent>
                        </InformationCard>
                    </BodyRow>

                    {studentChartData && (
                        <ChartContainer>
                             <Line
                                 options={{
                                     responsive: true,
                                     plugins: {
                                         legend: { position: 'top' as const },
                                         title: { display: true, text: `Alunos Cadastrados em ${yearSelected}` },
                                     },
                                 }} 
                                 data={studentChartData} 
                             />
                        </ChartContainer>
                    )}
                </Body>
            )}
        </Container>
    );
};