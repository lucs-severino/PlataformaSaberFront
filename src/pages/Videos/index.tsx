import { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { Container, Header, HeaderTitle, HeaderSubtitle, Body, VideoGrid, VideoCard, VideoThumbnail, VideoInfo, VideoTitle, VideoDescription, VideoMeta, Loading, ErrorMessage } from "./styles";
import { MdPlayCircleOutline, MdAccessTime, MdVisibility } from "react-icons/md";
import { getChannelVideos, getChannelInfo, openVideoInYouTube, type YouTubeVideo, type YouTubeChannel } from "../../services/youtube";

export const Videos = () => {
    const theme = useTheme();
    const [videos, setVideos] = useState<YouTubeVideo[]>([]);
    const [channelInfo, setChannelInfo] = useState<YouTubeChannel | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadVideos = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Carregar vídeos e informações do canal em paralelo
                const [videosData, channelData] = await Promise.all([
                    getChannelVideos(12),
                    getChannelInfo()
                ]);
                
                setVideos(videosData);
                setChannelInfo(channelData);
            } catch (err) {
                setError("Erro ao carregar vídeos do YouTube");
                console.error('Erro ao carregar vídeos:', err);
            } finally {
                setLoading(false);
            }
        };

        loadVideos();
    }, []);

    const handleVideoClick = (videoId: string) => {
        openVideoInYouTube(videoId);
    };

    if (loading) {
        return (
            <Container>
                <Header>
                    <HeaderTitle>Vídeos</HeaderTitle>
                    <HeaderSubtitle>Aulas e conteúdos musicais</HeaderSubtitle>
                </Header>
                <Body>
                    <Loading>
                        <div className="spinner"></div>
                        <p>Carregando vídeos...</p>
                    </Loading>
                </Body>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Header>
                    <HeaderTitle>Vídeos</HeaderTitle>
                    <HeaderSubtitle>Aulas e conteúdos musicais</HeaderSubtitle>
                </Header>
                <Body>
                    <ErrorMessage>
                        <p>{error}</p>
                        <button onClick={() => window.location.reload()}>
                            Tentar novamente
                        </button>
                    </ErrorMessage>
                </Body>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <HeaderTitle>Vídeos</HeaderTitle>
                <HeaderSubtitle>
                    {channelInfo 
                        ? `${channelInfo.title} - ${channelInfo.subscriberCount} inscritos • ${channelInfo.videoCount} vídeos`
                        : "Aulas e conteúdos musicais da Convergência Musical"
                    }
                </HeaderSubtitle>
            </Header>

            <Body>
                <VideoGrid>
                    {videos.map((video) => (
                        <VideoCard key={video.id} onClick={() => handleVideoClick(video.id)}>
                            <VideoThumbnail>
                                <img src={video.thumbnail} alt={video.title} />
                                <div className="play-overlay">
                                    <MdPlayCircleOutline size={48} />
                                </div>
                                <div className="duration">
                                    {video.duration}
                                </div>
                            </VideoThumbnail>
                            
                            <VideoInfo>
                                <VideoTitle>{video.title}</VideoTitle>
                                <VideoDescription>
                                    {video.description.length > 100 
                                        ? `${video.description.substring(0, 100)}...` 
                                        : video.description
                                    }
                                </VideoDescription>
                                
                                <VideoMeta>
                                    <div className="meta-item">
                                        <MdVisibility size={16} />
                                        <span>{video.viewCount} visualizações</span>
                                    </div>
                                    <div className="meta-item">
                                        <MdAccessTime size={16} />
                                        <span>{video.publishedAt}</span>
                                    </div>
                                </VideoMeta>
                            </VideoInfo>
                        </VideoCard>
                    ))}
                </VideoGrid>
            </Body>
        </Container>
    );
};
