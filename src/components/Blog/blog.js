import React, { useState, useEffect } from 'react';
import './blog.css';
import Footer from "../Footer";

const Blog = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'The Power of Aloe Vera in Skincare',
      content: 'Aloe vera is packed with vitamins, antioxidants, and anti-inflammatory properties that help soothe, hydrate, and heal the skin. Discover why it\'s the star ingredient in all our Aloe Flora products.',
      author: 'Doris Obondo',
      date: 'March 15, 2025',
      category: 'Skincare',
      image: 'https://images.unsplash.com/photo-1612197599273-5ba0ea084203?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
      likes: 0,
    },
    {
      id: 2,
      title: 'Sustainable Packaging: Why It Matters',
      content: 'At Aloe Flora, we are committed to eco-friendly packaging to reduce waste and protect the environment. Learn how sustainable packaging can make a big difference.',
      author: 'Ann Karimi',
      date: 'February 20, 2025',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1614728894747-0ef87d0c1316?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
      likes: 0,
    },
    {
      id: 3,
      title: 'Benefits of Natural Liquid Soaps',
      content: 'Unlike synthetic soaps, natural liquid soaps are gentle on the skin and free from harsh chemicals. Explore the benefits of Aloe Flora\'s multipurpose liquid soaps for your home and body.',
      author: 'Nelson Tommogo',
      date: 'January 10, 2025',
      category: 'Natural Products',
      image: 'https://images.unsplash.com/photo-1606761568499-6c3e24642b7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
      likes: 0,
    },
    {
      id: 4,
      title: 'Building a Healthier Home with Aloe-Based Cleaners',
      content: 'Clean homes shouldn\'t come at the expense of your health. Learn how Aloe Flora\'s aloe-based toilet cleaners and multipurpose soaps are safe, effective, and eco-friendly.',
      author: 'Lisa Ray',
      date: 'December 5, 2024',
      category: 'Home & Hygiene',
      image: 'https://images.unsplash.com/photo-1607082350920-3a6d464c4d76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
      likes: 0,
    },
    {
      id: 5,
      title: 'Why Aloe-Based Hair Products Are a Game Changer',
      content: 'Hair shampoos and conditioners with aloe vera deeply nourish your scalp and strengthen your hair naturally. Find out how Aloe Flora is redefining haircare routines.',
      author: 'Robert Moore',
      date: 'November 18, 2024',
      category: 'Haircare',
      image: 'https://images.unsplash.com/photo-1570172619642-062aa1e2f4a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
      likes: 0,
    },
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