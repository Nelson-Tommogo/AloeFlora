import './Team.css';
import Footer from "../Footer";
import teamMember1 from '../../assets/home/doris.jpg'; 
import teamMember2 from '../../assets/home/profile.jpeg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faLinkedin, faGithub, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

const teamMembers = [
  {
    id: 1,
    name: 'Doris Obondo',
    role: 'Chief Executive Officer (CEO) and Founder',
    image: teamMember1,
    expertise: 'Entrepreneurship, Business Strategy, and Product Development.',
    bio: 'Doris Obondo is a visionary entrepreneur with a Diploma in Business Administration from Africa Nazarene University. Recognized as the Most Innovative Student in 2022, she is the Founder and CEO of Flora Products, specializing in natural skincare and hygiene solutions. In 2020, she launched a natural liquid hand wash to address skin irritation from conventional soaps. A Certified Pursuit Entrepreneur, Doris refines her expertise in business strategy and product development while driving innovation and sustainability in the beauty and hygiene industry.',
    socialLinks: {
      twitter: '',
      linkedIn: '',
      facebook: '',
    },
},


  {
    id: 2,
    name: 'Nelson Tommogo',
    role: 'IT Head',
    image: teamMember2,
    expertise: 'Software Engineering, Mobile and Web Engineering',
    bio: 'As the IT Specialist and at Aloe Flora Products Limited, I drive technological innovation and process optimization to enhance product quality and efficiency while leading a multidisciplinary team to develop and implement strategies that align with the company’s goals.',
    socialLinks: {
      twitter: 'https://x.com/nelson_tommogo',
      linkedIn: 'https://www.linkedin.com/in/nelson-tommogo/',
      github: 'https://github.com/Nelson-Tommogo',
    },
  },
];

const Team = () => {
  return (
    <>
      <div className="company-team-container">
        <header className="team-header">
          <h1>Meet Our Team</h1>
          <p>Our team of experienced professionals is dedicated to bringing our vision to life.</p>
        </header>

        {/* Team Member Grid */}
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-image-container">
                <img src={member.image} alt={member.name} className="team-image" />
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-expertise">{member.expertise}</p>
              <p className="team-bio">{member.bio}</p>
              <div className="social-links">
                {member.socialLinks.twitter && (
                  <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                )}
                {member.socialLinks.linkedIn && (
                  <a href={member.socialLinks.linkedIn} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                )}
                {member.socialLinks.github && (
                  <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                )}
                {member.socialLinks.facebook && (
                  <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                )}
                {member.socialLinks.instagram && (
                  <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Team;
