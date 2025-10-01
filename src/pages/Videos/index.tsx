import { useState, useEffect } from 'react';
import {
    Container,
    Header,
    HeaderTitle,
    HeaderSubtitle,
    Body,
    VideoGrid,
    VideoCard,
    VideoThumbnail,
    VideoInfo,
    VideoTitle,
    VideoMeta,
    PlayButton,
    Modal,
    ModalContent,
    ModalHeader,
    ModalTitle,
    CloseButton,
    VideoPlayer,
    LoadingContainer,
    LoadingSpinner,
    ErrorContainer,
    ErrorMessage
} from './styles';
import { MdPlayCircleOutline, MdClose } from 'react-icons/md';

interface Video {
    id: string;
    title: string;
    thumbnail: string;
    videoUrl: string;
    duration: string;
    publishedAt: string;
}

const mockVideos: Video[] = [
    {
        id: '1',
        title: 'Aula de Violão - Acordes Básicos',
        thumbnail: 'https://img.youtube.com/vi/wdNeoegoC_s/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/wdNeoegoC_s',
        duration: '15:30',
        publishedAt: '2024-01-15'
    },
    {
        id: '2',
        title: 'Técnicas de Piano - Escalas Maiores',
        thumbnail: 'https://img.youtube.com/vi/oDPAVJLQwI4/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/oDPAVJLQwI4',
        duration: '22:45',
        publishedAt: '2024-01-20'
    },
    {
        id: '3',
        title: 'Bateria - Ritmos Básicos',
        thumbnail: 'https://img.youtube.com/vi/k90Gl6cJLs4/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/k90Gl6cJLs4',
        duration: '18:20',
        publishedAt: '2024-01-25'
    },
    {
        id: '4',
        title: 'Canto - Técnicas de Respiração',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '12:15',
        publishedAt: '2024-02-01'
    },
    {
        id: '5',
        title: 'Guitarra - Solos Intermediários',
        thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
        duration: '25:30',
        publishedAt: '2024-02-05'
    },
    {
        id: '6',
        title: 'Baixo - Grooves Essenciais',
        thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
        videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
        duration: '20:45',
        publishedAt: '2024-02-10'
    }
];

export const Videos = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Simular carregamento de vídeos
        const loadVideos = async () => {
            try {
                setLoading(true);
                // Simular delay de API
                await new Promise(resolve => setTimeout(resolve, 1000));
                setVideos(mockVideos);
            } catch (err) {
                setError('Erro ao carregar vídeos');
            } finally {
                setLoading(false);
            }
        };

        loadVideos();
    }, []);

    const handleVideoClick = (video: Video) => {
        setSelectedVideo(video);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedVideo(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    if (loading) {
        return (
            <Container>
                <LoadingContainer>
                    <LoadingSpinner />
                    <p>Carregando vídeos...</p>
                </LoadingContainer>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <ErrorContainer>
                    <ErrorMessage>{error}</ErrorMessage>
                </ErrorContainer>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <HeaderTitle>Vídeos Educativos</HeaderTitle>
                <HeaderSubtitle>
                    Aulas e tutoriais para aprimorar suas habilidades musicais
                </HeaderSubtitle>
            </Header>

            <Body>
                <VideoGrid>
                    {videos.map((video) => (
                        <VideoCard key={video.id} onClick={() => handleVideoClick(video)}>
                            <VideoThumbnail>
                                <img src={video.thumbnail} alt={video.title} />
                                <PlayButton>
                                    <MdPlayCircleOutline size={48} />
                                </PlayButton>
                            </VideoThumbnail>
                            <VideoInfo>
                                <VideoTitle>{video.title}</VideoTitle>
                                <VideoMeta>
                                    <span>{video.duration}</span>
                                    <span>{formatDate(video.publishedAt)}</span>
                                </VideoMeta>
                            </VideoInfo>
                        </VideoCard>
                    ))}
                </VideoGrid>
            </Body>

            {isModalOpen && selectedVideo && (
                <Modal onClick={closeModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <ModalHeader>
                            <ModalTitle>{selectedVideo.title}</ModalTitle>
                            <CloseButton onClick={closeModal}>
                                <MdClose size={24} />
                            </CloseButton>
                        </ModalHeader>
                        <VideoPlayer>
                            <iframe
                                src={selectedVideo.videoUrl}
                                title={selectedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </VideoPlayer>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};