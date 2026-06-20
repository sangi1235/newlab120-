import React, { useState } from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, X, Heart } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  category: 'Bridal' | 'Groom' | 'Trends' | 'Tailoring';
  date: string;
  readTime: string;
  image: string;
  author: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'bridal-silhouettes',
    title: 'Choosing the Perfect Silhouette for Your Bridal Gown',
    excerpt: 'Understanding the grace of A-Line, the drama of Ballgowns, and the modern elegance of Empire cuts.',
    content: [
      'Your wedding gown is a statement of personal grace and artistic expression. Finding the silhouette that resonates with you is the first and most important step of the design journey.',
      '1. The Classic A-Line: Fitting snugly around the bodice and flowing out gently in an "A" shape, this silhouette is universally flattering. It adds height and creates balanced proportions, making it ideal for romantic, garden-style ceremonies.',
      '2. The Majestic Ballgown: Perfect for grand cathedral ceremonies, the ballgown features a fitted bodice and a full, dramatic skirt. It offers a sense of traditional royalty and looks stunning with lace overlays and long trains.',
      '3. The Empire Waist: Boasting a raised waistline that starts right below the bust, the empire silhouette flows down into a soft, airy skirt. It creates a lengthening effect and offers exceptional comfort, perfect for beach and bohemian weddings.',
      'At Ethereal Atelier, we tailor each silhouette to your exact measurements, allowing you to customize neckline options, lace placements, and train lengths.'
    ],
    category: 'Bridal',
    date: 'June 18, 2026',
    readTime: '5 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9ynyuOQKZz86yg3wwuy6PRyiXJp1PitM3Fqw2MaSKtH7cuThjJ7rALfXNkVVQfJJ-hzMWq8GUIKqypWNGzOFZZDgfm0TWds1UAZ-MxOOj0vap9TCFdbzzs-1t67xF89l6L8G3_HoRhHn9TdCSb_7LJYMyTs1NpfDZ4hVOoNakEwluc7qVoqStyfAyh1BSG33V7rqIxkoCswTgNNOnYoPfqVrFve9yCFB8nJJGZUf5q0gpRZWyUBIORDCUJ0AzCtSZcoeLVEePQ_t0',
    author: 'Elena Rostova, Lead Bridal Couturier'
  },
  {
    id: 'groom-trends-2026',
    title: 'The Art of Modern Groom Suiting: Beyond the Classic Black Tuxedo',
    excerpt: 'Explore deep charcoal tones, rich merino wool fabrics, and personalizing custom silk linings.',
    content: [
      'While the classic black tuxedo remains timeless, modern grooms are embracing rich colors, bespoke fabrics, and structural variations to showcase their personal style.',
      'Deep charcoal and midnight navy have become popular choices. They offer a softer, more contemporary look under natural sunlight while maintaining high elegance for evening celebrations.',
      'Fabric selection is critical. We recommend Italian Merino wool blends for their lightweight breathability and structured silhouette. For winter weddings, heavy velvet dinner jackets in emerald or burgundy add premium depth and luxury textures.',
      'The secret of a truly bespoke suit is in the details: customized lapel widths, monogrammed under-collars, and personalized printed silk linings that reflect a couple’s shared memories.'
    ],
    category: 'Groom',
    date: 'June 10, 2026',
    readTime: '4 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrz-C4Ml1LzgxkmNncBfmxxTCRO0ZKrHHbKS9t8e6FGd0owIdosUvoJAdSwvpygeymfvF32Mb4WHGKTstBz0jEAdO0AxHPfxohS6J58mgjjjfui5Y_t4bVquY14RVU9hzv-2PN7f_L3AMdMG9mCm44vfa1nPkV0hGJCqZONz5rz1BnUOZuZY51ldEVAHdMBhukslnqvn7zHrtcm7LOy9D1hWBR-_wUsK1HNtn1I0xqPZKE_jKWdN4Ul9PPwaT19EolzUZA8DQsg8QD',
    author: 'Julian Vance, Master Tailor'
  },
  {
    id: 'south-asian-fusion',
    title: 'Heritage Meets Modernity: The Rise of Fusion Wedding Saris & Lehengas',
    excerpt: 'How pre-draped borders and modern metallic waist belts are redefining traditional bridal attire.',
    content: [
      'Contemporary bridal fashion is celebrating rich cultural heritage through design innovations. Fusion wear allows brides and guests to enjoy traditional embroidery with modern ease.',
      'Our Regal Fusion Lehenga pairs intricate zardozi embroidery with lightweight, structural fabrics that allow fluid movement on the dance floor.',
      'Pre-draped saris are another revolutionary addition. By securing pleats and including a contemporary metallic belt, we offer the majestic silhouette of a traditional sari without the complexity of manual draping.',
      'Color palettes have also evolved. While deep crimson and gold remain sacred, pastel mints, lavenders, and champagne golds are making spectacular appearances in fusion ceremonies.'
    ],
    category: 'Trends',
    date: 'May 28, 2026',
    readTime: '6 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvOeVThCmimeWHcnk4dEpu6N1_p5KsEgA1apecCdNQWCRB8oqDeCKJABmq2GmKq3RYNInwvWg71UPl4MBiXs5lWj6tiJp3_IqevbS_nDNMflmPVOsAIfceFNkJXdz8XKOs0C1K086_baes6g2TGaZ4poze7yEwbfxfnCh2Q9aA75h4NAcYx8ePbf0Lttl-rWykoxiTWyr5THVeEWpuVVoj7yh75nShboWqcPObs5s8H8QEj9oaR8WxYs99IfTO63o_DpNEyDgjA98i',
    author: 'Priya Sharma, Cultural Design Consultant'
  },
  {
    id: 'measuring-at-home',
    title: 'The Bespoke Intake: How to Measure Yourself for Master Tailoring',
    excerpt: 'A comprehensive step-by-step guide to capturing perfect bust, waist, hips, and height measurements.',
    content: [
      'Ordering bespoke attire online is simple when you submit accurate measurements. Here is our expert guide to measuring yourself at home.',
      '1. Prepare Correctly: Wear thin undergarments that fit well, stand straight with relaxed posture, and keep a flexible tape measure level to the floor.',
      '2. Bust / Chest: Measure around the fullest part of your bust or chest, keeping the tape comfortably snug but not tight.',
      '3. Waist: Find your natural waistline (typically the narrowest part of your torso, located just above your belly button). Keep one finger between your body and the tape.',
      '4. Hips: Stand with your feet together and measure around the widest part of your hips and seat.',
      'If you have questions, our digital intake assistant can assist or you can submit photo references on our contact form for validation.'
    ],
    category: 'Tailoring',
    date: 'May 14, 2026',
    readTime: '3 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_qHvmuKwSs2rrz_tcj6XtSQtXIfGAVDBUcmcXlMu_Znz5xtRBUavzdbURW0odoh__byNkDYsgFCibJToPi-vd_5wXpsqx3qs8dI-1Lu8csHPkIUpV4IXC8maHWO0-RorrQu6cAAuhzvVC_D-ivyY7Zmi6CUqDGKyGVa2dOysgyn81RfXetti16MNQSOBDLvK7wdNDsbIkFYC-CLLI97grXXmcQLGp54uIQeZyrc1wmBC7qocwlI6SuYow5_AZyt-Dy1DyW7AEt8h0',
    author: 'Marcus Vance, Quality Assurance Lead'
  }
];

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  const categories = ['All', 'Bridal', 'Groom', 'Trends', 'Tailoring'];

  const filteredPosts = selectedCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(post => post.category === selectedCategory);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', animation: 'fadeIn var(--transition-smooth)' }}>
      {/* Blog Page Hero Header */}
      <section 
        className="glass-card"
        style={{
          position: 'relative',
          padding: '60px 40px',
          borderRadius: 'var(--radius-lg)',
          background: 'linear-gradient(135deg, rgba(253, 242, 244, 0.7) 0%, rgba(255, 255, 255, 0.8) 100%)',
          border: '1px solid var(--primary-light)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          overflow: 'hidden'
        }}
      >
        <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ color: 'var(--accent)', background: 'var(--primary-light)', padding: '8px', borderRadius: 'var(--radius-full)', display: 'inline-flex' }}>
            <BookOpen size={20} />
          </div>
          <h1 style={{ fontSize: '2.8rem', lineHeight: 1.1, margin: '10px 0' }}>
            Atelier <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>Journal</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', lineHeight: 1.5 }}>
            Expert design tips, fabric selections, and styling guides curated by our couture design house.
          </p>
        </div>
      </section>

      {/* Category Selection Filter */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', margin: '10px 0' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`btn ${selectedCategory === cat ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '8px 20px', borderRadius: 'var(--radius-full)', fontSize: '0.85rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts Grid list */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        {filteredPosts.map(post => (
          <article 
            key={post.id} 
            className="glass-card" 
            onClick={() => setSelectedPost(post)}
            style={{ 
              borderRadius: 'var(--radius-md)', 
              overflow: 'hidden', 
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            {/* Post Image Container */}
            <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
              <img 
                src={post.image} 
                alt={post.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-smooth)' }} 
                className="blog-img"
              />
              <span style={{ 
                position: 'absolute', 
                top: '15px', 
                left: '15px', 
                background: 'var(--bg-surface)', 
                color: 'var(--text-main)', 
                padding: '4px 12px', 
                borderRadius: 'var(--radius-full)', 
                fontSize: '0.75rem', 
                fontWeight: 700, 
                boxShadow: 'var(--shadow-sm)' 
              }}>
                {post.category}
              </span>
            </div>

            {/* Post Details Card */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Calendar size={12} /> {post.date}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {post.readTime}</span>
              </div>
              <h3 style={{ fontSize: '1.35rem', lineHeight: 1.3, color: 'var(--text-main)' }}>{post.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{post.excerpt}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '15px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-light)' }}>{post.author.split(',')[0]}</span>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button 
                    onClick={(e) => handleLike(post.id, e)} 
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)' }}
                  >
                    <Heart size={14} fill={likes[post.id] ? 'var(--accent)' : 'none'} />
                    <span style={{ fontSize: '0.8rem' }}>{likes[post.id] || 0}</span>
                  </button>
                  <span style={{ color: 'var(--primary-dark)', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Styled JSX Hover Animations */}
      <style>{`
        .glass-card:hover .blog-img {
          transform: scale(1.05);
        }
      `}</style>

      {/* Detailed Post Dialog Modal Overlay */}
      {selectedPost && (
        <div 
          onClick={() => setSelectedPost(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(12, 8, 9, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            animation: 'fadeIn var(--transition-fast)'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '750px',
              maxHeight: '90vh',
              borderRadius: 'var(--radius-lg)',
              overflowY: 'auto',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            {/* Modal close icon button */}
            <button 
              onClick={() => setSelectedPost(null)}
              style={{
                position: 'absolute',
                top: '20px', right: '20px',
                zIndex: 10,
                width: '36px', height: '36px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)',
                color: 'var(--text-main)'
              }}
            >
              <X size={16} />
            </button>

            {/* Modal Image Header */}
            <div style={{ height: '300px', width: '100%', overflow: 'hidden', position: 'relative' }}>
              <img src={selectedPost.image} alt={selectedPost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to top, rgba(24, 17, 19, 0.8) 0%, transparent 60%)'
              }} />
              <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', color: '#ffffff' }}>
                <span style={{ 
                  background: 'var(--accent)', 
                  color: '#ffffff', 
                  padding: '4px 12px', 
                  borderRadius: 'var(--radius-full)', 
                  fontSize: '0.75rem', 
                  fontWeight: 700 
                }}>
                  {selectedPost.category}
                </span>
                <h2 style={{ fontSize: '1.8rem', marginTop: '10px', color: '#ffffff' }}>{selectedPost.title}</h2>
              </div>
            </div>

            {/* Modal Body Content */}
            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px' }}>
                <div>
                  <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{selectedPost.author}</span>
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <span>{selectedPost.date}</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              {/* Main Content Paragraphs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', lineHeight: 1.7, color: 'var(--text-main)', fontSize: '0.98rem' }}>
                {selectedPost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Modal Like / Actions footer */}
              <div style={{ display: 'flex', justifyItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '10px' }}>
                <button 
                  onClick={(e) => handleLike(selectedPost.id, e)} 
                  className="btn btn-outline"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', border: '1px solid var(--border-color)', padding: '10px 20px' }}
                >
                  <Heart size={16} fill={likes[selectedPost.id] ? 'var(--accent)' : 'none'} />
                  <span>Like Article ({likes[selectedPost.id] || 0})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
