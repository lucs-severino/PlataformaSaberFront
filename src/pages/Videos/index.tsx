import React from "react";

type Video = {
  id: string;
  title: string;
  embedUrl: string;
};

export const Videos: React.FC = () => {
  // Vídeos com embed direto
  const videos: Video[] = [
    {
      id: "zwbvBLilClQ",
      title: "Tutorial da Plataforma - Parte 1",
      embedUrl: "https://www.youtube.com/embed/zwbvBLilClQ?rel=0&showinfo=0"
    },
    {
      id: "oROqQLDmYKk", 
      title: "Tutorial da Plataforma - Parte 2",
      embedUrl: "https://www.youtube.com/embed/oROqQLDmYKk?rel=0&showinfo=0"
    },
    {
      id: "S5xibOcwl98",
      title: "Tutorial da Plataforma - Parte 3", 
      embedUrl: "https://www.youtube.com/embed/S5xibOcwl98?rel=0&showinfo=0"
    }
  ];

  return (
    <div style={{
      padding: '2rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '0.5rem'
          }}>
            Vídeos Instrutivos da Escola
          </h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {videos.map((video, index) => (
            <div key={video.id} style={{
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                height: '0',
                overflow: 'hidden',
                background: '#000'
              }}>
                <iframe
                  src={video.embedUrl}
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.title}
                />
              </div>
              
              <div style={{
                padding: '1rem'
              }}>
                <h2 style={{
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {video.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
