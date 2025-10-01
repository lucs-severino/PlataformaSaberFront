// YouTube API Service
// Para usar a API real do YouTube, você precisará de uma API Key
// https://developers.google.com/youtube/v3/getting-started

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    publishedAt: string;
    viewCount: string;
    duration: string;
    channelTitle: string;
    videoUrl: string;
}

export interface YouTubeChannel {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    subscriberCount: string;
    videoCount: string;
}

// Configuração da API do YouTube
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID || '';
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Função para formatar números (visualizações, inscritos)
const formatNumber = (num: string): string => {
    const number = parseInt(num);
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return number.toString();
};

// Função para formatar duração do vídeo (ISO 8601 para formato legível)
const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '0:00';
    
    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Função para formatar data
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
};

// Buscar vídeos do canal
export const getChannelVideos = async (maxResults: number = 12): Promise<YouTubeVideo[]> => {
    try {
        if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
            console.warn('YouTube API Key ou Channel ID não configurados. Usando dados mock.');
            return getMockVideos();
        }

        // Buscar uploads do canal
        const uploadsResponse = await fetch(
            `${YOUTUBE_API_BASE_URL}/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!uploadsResponse.ok) {
            throw new Error('Erro ao buscar canal');
        }
        
        const uploadsData = await uploadsResponse.json();
        const uploadsPlaylistId = uploadsData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
        
        if (!uploadsPlaylistId) {
            throw new Error('Playlist de uploads não encontrada');
        }

        // Buscar vídeos da playlist de uploads
        const videosResponse = await fetch(
            `${YOUTUBE_API_BASE_URL}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!videosResponse.ok) {
            throw new Error('Erro ao buscar vídeos');
        }
        
        const videosData = await videosResponse.json();
        
        // Buscar detalhes dos vídeos (duração, visualizações)
        const videoIds = videosData.items.map((item: any) => item.snippet.resourceId.videoId).join(',');
        
        const detailsResponse = await fetch(
            `${YOUTUBE_API_BASE_URL}/videos?part=contentDetails,statistics&id=${videoIds}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!detailsResponse.ok) {
            throw new Error('Erro ao buscar detalhes dos vídeos');
        }
        
        const detailsData = await detailsResponse.json();
        
        // Combinar dados
        const videos: YouTubeVideo[] = videosData.items.map((item: any, index: number) => {
            const details = detailsData.items[index];
            return {
                id: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url,
                publishedAt: formatDate(item.snippet.publishedAt),
                viewCount: formatNumber(details.statistics.viewCount),
                duration: formatDuration(details.contentDetails.duration),
                channelTitle: item.snippet.channelTitle,
                videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
            };
        });
        
        return videos;
        
    } catch (error) {
        console.error('Erro ao buscar vídeos do YouTube:', error);
        return getMockVideos();
    }
};

// Buscar informações do canal
export const getChannelInfo = async (): Promise<YouTubeChannel | null> => {
    try {
        if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
            return getMockChannel();
        }

        const response = await fetch(
            `${YOUTUBE_API_BASE_URL}/channels?part=snippet,statistics&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Erro ao buscar informações do canal');
        }
        
        const data = await response.json();
        const channel = data.items[0];
        
        return {
            id: channel.id,
            title: channel.snippet.title,
            description: channel.snippet.description,
            thumbnail: channel.snippet.thumbnails.high?.url,
            subscriberCount: formatNumber(channel.statistics.subscriberCount),
            videoCount: formatNumber(channel.statistics.videoCount)
        };
        
    } catch (error) {
        console.error('Erro ao buscar informações do canal:', error);
        return getMockChannel();
    }
};

// Dados mock para desenvolvimento/teste com vídeos reais
const getMockVideos = (): YouTubeVideo[] => [
    {
        id: "wdNeoegoC_s",
        title: "Aula de Música - Convergência Musical",
        description: "Aula especial da Convergência Musical. Aprenda técnicas musicais avançadas com nossos professores especializados.",
        thumbnail: "https://img.youtube.com/vi/wdNeoegoC_s/maxresdefault.jpg",
        publishedAt: "15/01/2024",
        viewCount: "1.2K",
        duration: "15:30",
        channelTitle: "Convergência Musical",
        videoUrl: "https://www.youtube.com/watch?v=wdNeoegoC_s"
    },
    {
        id: "oDPAVJLQwI4",
        title: "Técnicas Musicais - Convergência Musical",
        description: "Descubra técnicas musicais essenciais para aprimorar sua performance. Aulas práticas e teóricas para todos os níveis.",
        thumbnail: "https://img.youtube.com/vi/oDPAVJLQwI4/maxresdefault.jpg",
        publishedAt: "10/01/2024",
        viewCount: "2.5K",
        duration: "22:15",
        channelTitle: "Convergência Musical",
        videoUrl: "https://www.youtube.com/watch?v=oDPAVJLQwI4"
    },
    {
        id: "k90Gl6cJLs4",
        title: "Performance Musical - Convergência Musical",
        description: "Aprenda sobre performance musical e como se apresentar com confiança. Dicas valiosas para músicos de todos os estilos.",
        thumbnail: "https://img.youtube.com/vi/k90Gl6cJLs4/maxresdefault.jpg",
        publishedAt: "05/01/2024",
        viewCount: "3.1K",
        duration: "18:45",
        channelTitle: "Convergência Musical",
        videoUrl: "https://www.youtube.com/watch?v=k90Gl6cJLs4"
    }
];

const getMockChannel = (): YouTubeChannel => ({
    id: "UC_convergencia_musical",
    title: "Convergência Musical",
    description: "Canal oficial da escola de música Convergência Musical. Aulas, dicas e conteúdos musicais para todos os níveis.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    subscriberCount: "1.2K",
    videoCount: "45"
});

// Função para abrir vídeo no YouTube
export const openVideoInYouTube = (videoId: string): void => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
};

// Função para gerar URL de embed do YouTube
export const getYouTubeEmbedUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}`;
};
