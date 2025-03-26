import hairtreatment from '../../assets/_MG_9328.jpg'; 
import toiletcleaner from '../../assets/toiletcleaner.jpg';
import lotion from '../../assets/lotion.png';  
import showergel from '../../assets/showergel.jpg';  
import product8 from '../../assets/handwashsaop.jpeg';  
import hairconditioner from '../../assets/_MG_9314.png';  

const fakeData = [
    // Skincare & Body Care Products
    {
        id: 1,
        title: 'Body Lotion',
        img: lotion,
        category: 'skincare'
    },
    {
        id: 2,
        title: 'Shower Gel',
        img: showergel,
        category: 'skincare'
    },
    {
        id: 3,
        title: 'Hair Conditioner',
        img: hairconditioner,
        category: 'skincare'
    },

    // Cleaning & Hygiene Products
    {
        id: 4,
        title: 'Hair Treatment',
        img: hairtreatment,
        category: 'cleaning'
    },
    {
        id: 8,
        title: 'Handwash Soap',
        img: product8,
        category: 'cleaning'
    },
    {
        id: 9,
        title: 'Toilet Cleaner',
        img: toiletcleaner,
        category: 'cleaning'
    }
];

export default fakeData;
