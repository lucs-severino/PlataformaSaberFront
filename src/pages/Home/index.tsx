import { useEffect, useState } from "react"
import { useTheme } from "styled-components"
import { Body, BodyRow, Container, Header, HeaderActions, HeaderFilter, HeaderInfo, HeaderSubtitle, HeaderTitle, InformationCard, InformationCardContent, InformationCardContentLabel, InformationCardContentValue, Loading } from "./styles"
import SelectInput from "../../components/SelectInput"
import { ScaleLoader } from "react-spinners"
import { FcCalendar, FcClock, FcOk, FcCancel } from "react-icons/fc"
import { Button } from "../../components/Button"
import { MdAdd } from "react-icons/md"
import { getDashboardAgendamentos } from "../../services/requests"
import type { DashboardData } from "../../@types/Agendamento"
import { useNavigate } from "react-router-dom"

export const Home = () => {
    const [loadingRequest, setLoadingRequest] = useState(true)
    const [monthSelected, setMonthSelected] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'))
    const [yearSelected, setYearSelected] = useState(new Date().getFullYear().toString())
    const [dataDashboard, setDataDashboard] = useState<DashboardData | null>(null)

    const theme = useTheme()
    const navigate = useNavigate()

    const handleMonthSelected = (e: { target: { value: string } }) => setMonthSelected(e.target.value)
    const handleYearSelected = (e: { target: { value: string } }) => setYearSelected(e.target.value)

    const getYears = () => {
        const years = [];

        for (let year = 2024; year <= new Date().getFullYear(); year++) {
            years.push({ label: year.toString(), value: year.toString() })
        }

        return years;
    }

    const getMonths = () => {
        const monthsArray = Array.from({ length: 12 }, (_, index) => {
            const date = new Date(new Date().getFullYear(), index, 1)
            return {
                value: (index + 1).toString().padStart(2, '0'),
                label: date.toLocaleString('pt-BR', { month: 'long' })
            }
        })

        return monthsArray;
    }

    const handleGetDashboard = async () => {
        setLoadingRequest(true)
        const response = await getDashboardAgendamentos()
        setLoadingRequest(false)
        if (response.data) {
            setDataDashboard(response.data)
        }
    }

    useEffect(() => {
        handleGetDashboard()
    }, [monthSelected, yearSelected])

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

            {loadingRequest &&
                <Loading>
                    <ScaleLoader color={theme.COLORS.primary} />
                </Loading>
            }

            {!loadingRequest &&
                <Body>
                    <BodyRow>
                        <InformationCard>
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

                        <InformationCard>
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

                        <InformationCard>
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

                        <InformationCard>
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
                </Body>
            }
        </Container>
    )
}