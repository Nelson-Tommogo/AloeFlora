import React, { useState, useEffect } from 'react';
import './blog.css';
import Footer from "../Footer";

const Blog = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'Aloe Flora’s Commitment to Sustainable Aloe Farming in Kenya',
      content: 'Aloe Flora partners with local communities and KEFRI to promote sustainable aloe farming. This initiative not only conserves the environment but also economically empowers farmers in Kenya.',
      author: 'Doris Obondo',
      date: 'June 1, 2025',
      category: 'Sustainability',
      image: 'https://i.pinimg.com/736x/f8/c8/6e/f8c86e06e949b84a8d1b462904875912.jpg',
      likes: 0,
    },
    {
      id: 2,
      title: 'The Science Behind Aloe Flora’s Skincare Products',
      content: 'Our skincare line is enriched with aloe vera’s bioactive compounds like aloin and acemannan, which soothe, moisturize, and heal your skin naturally.',
      author: 'Nelson Tommogo',
      date: 'June 2, 2025',
      category: 'Skincare',
      image: 'https://i.pinimg.com/736x/07/c4/8d/07c48dd9cebb208d7a0f6ed8e3de658f.jpg',
      likes: 0,
    },
    {
      id: 3,
      title: 'Empowering Women Through Aloe Farming: Success Stories',
      content: 'In areas like Laikipia, Aloe Flora supports women-led aloe farming groups. Their success stories reflect resilience and transformation through agri-business.',
      author: 'Ann Karimi',
      date: 'June 3, 2025',
      category: 'Empowerment',
      image: 'https://i.pinimg.com/736x/5d/27/b5/5d27b5e16c6c037b72828947618212af.jpg',
      likes: 0,
    },
    {
      id: 4,
      title: 'From Leaf to Lotion: The Journey of Aloe Flora’s Products',
      content: 'Take a tour from aloe leaf harvesting, through quality processing, to packaging of our bestselling lotions. Quality and integrity in every drop.',
      author: 'Lisa Ray',
      date: 'June 4, 2025',
      category: 'Behind the Scenes',
      image: 'https://i.pinimg.com/736x/31/82/bd/3182bd3e10625547946a91186ef810d4.jpg',
      likes: 0,
    },
    {
      id: 5,
      title: 'Aloe Flora’s Role in Revitalizing Kenya’s Aloe Industry',
      content: 'Reviving aloe farming has not only brought new economic opportunities but also placed Kenya on the map for natural product exports. Aloe Flora is proud to lead this charge.',
      author: 'David Otieno',
      date: 'June 5, 2025',
      category: 'Agribusiness',
      image: 'https://i.pinimg.com/736x/ac/da/61/acda611bd5f729672865421b0a087913.jpg',
      likes: 0,
    },
    {
      id: 6,
      title: 'The Environmental Benefits of Aloe Cultivation',
      content: 'Aloe is drought-resistant and ideal for drylands. Our farming model supports reforestation and restores degraded lands across semi-arid regions.',
      author: 'Winnie Achieng',
      date: 'June 6, 2025',
      category: 'Environment',
      image: 'https://i.pinimg.com/736x/44/88/a9/4488a9e0fb73d63e5c6639a0c838d770.jpg',
      likes: 0,
    },
    {
      id: 7,
      title: 'Aloe Flora’s Community Outreach and Education Programs',
      content: 'We run regular training and workshops to help farmers learn best practices in aloe farming and product development for better livelihoods.',
      author: 'Samuel Waweru',
      date: 'June 7, 2025',
      category: 'Community',
      image: 'https://i.pinimg.com/736x/5c/4d/97/5c4d970020138fa22093a6a12f42bb93.jpg',
      likes: 0,
    },
    {
      id: 8,
      title: 'Innovations in Aloe-Based Product Development at Aloe Flora',
      content: 'We’re constantly innovating — from multipurpose soaps to herbal toothpaste. Our R&D ensures high-performance, nature-powered wellness products.',
      author: 'Nelson Tommogo',
      date: 'June 8, 2025',
      category: 'Innovation',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
      likes: 0,
    },
    {
      id: 9,
      title: 'Navigating the Global Market: Aloe Flora’s Export Strategies',
      content: 'We are building Kenya’s reputation abroad by complying with international standards and offering premium organic aloe-based products worldwide.',
      author: 'Ann Karimi',
      date: 'June 9, 2025',
      category: 'Business',
      image: 'https://i.pinimg.com/736x/e4/9b/4e/e49b4ed30b220c12f510a20a84d68e94.jpg',
      likes: 0,
    }
  ]);  
  
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 3;
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('blogLikes')) || {};
    setBlogs((prevBlogs) => 
      prevBlogs.map(blog => ({
        ...blog,
        likes: storedLikes[blog.id] || 0,
      }))
    );
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLike = (id) => {
    const userLikes = JSON.parse(localStorage.getItem('userLikes')) || {};
    
    if (userLikes[id]) {
      alert("You have already liked this blog!");
      return;
    }

    const updatedBlogs = blogs.map(blog => {
      if (blog.id === id) {
        const newLikes = blog.likes + 1;

        const storedLikes = JSON.parse(localStorage.getItem('blogLikes')) || {};
        storedLikes[id] = newLikes;
        localStorage.setItem('blogLikes', JSON.stringify(storedLikes));

        userLikes[id] = true;
        localStorage.setItem('userLikes', JSON.stringify(userLikes));

        return { ...blog, likes: newLikes };
      }
      return blog;
    });
    
    setBlogs(updatedBlogs);
  };

  const openShareModal = (blog) => {
    setSelectedBlog(blog);
    setShareModalOpen(true);
  };

  const closeShareModal = () => {
    setShareModalOpen(false);
    setSelectedBlog(null);
  };

  const shareOnPlatform = (platform) => {
    const url = window.location.href;
    const text = encodeURIComponent(`Check out this blog: ${selectedBlog.title} at ${url}`);
    let shareUrl;

    switch(platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(selectedBlog.title)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
    closeShareModal();
  };

  return (
    <div className="blog-container aloe-theme">
      <section className="hero-section">
        <h1>Aloe Flora Insights</h1>
        <p>Wellness. Beauty. Sustainability — Naturally Inspired Living.</p>
      </section>

      <div className="blog-list">
        {currentBlogs.map((blog) => (
          <article key={blog.id} className="blog-post">
            <div className="blog-image-container">
              <img src={blog.image} alt={blog.title} className="blog-image" />
            </div>
            <div className="blog-content">
              <h2>{blog.title}</h2>
              <p className="blog-excerpt">{blog.content.substring(0, 120)}...</p>
              <div className="blog-info">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
                <span className="blog-category">{blog.category}</span>
              </div>
              <div className="blog-actions">
                <button 
                  className="like-btn"
                  onClick={() => handleLike(blog.id)}
                >
                  <i className="fas fa-thumbs-up"></i> {blog.likes} Likes
                </button>
                <button 
                  className="share-btn"
                  onClick={() => openShareModal(blog)}
                >
                  <i className="fas fa-share-alt"></i> Share
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: Math.ceil(blogs.length / blogsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {shareModalOpen && selectedBlog && (
        <div className="share-modal">
          <div className="share-modal-content">
            <h2>Share this blog</h2>
            <button onClick={() => shareOnPlatform('twitter')}>
              <i className="fab fa-twitter"></i> Twitter
            </button>
            <button onClick={() => shareOnPlatform('linkedin')}>
              <i className="fab fa-linkedin"></i> LinkedIn
            </button>
            <button onClick={() => shareOnPlatform('facebook')}>
              <i className="fab fa-facebook"></i> Facebook
            </button>
            <button className="close-btn" onClick={closeShareModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Blog;