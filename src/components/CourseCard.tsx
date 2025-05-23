import { Course } from '@/types';
"use client";

import Image from 'next/image';
import Link from 'next/link';
import SectionTransition from './SectionTransition';
import './course-card.css'; // Adding CSS for triangle clip path

// Map of course subjects to appropriate Unsplash images
const courseImages: Record<string, string> = {
  'mathematics': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format',
  'science': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format',
  'history': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format',
  'english': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format',
  'art': 'https://images.unsplash.com/photo-1452802447250-470a88ac82bc?q=80&w=600&auto=format',
  'music': 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=600&auto=format',
  'physical education': 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format',
  'computer science': 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=600&auto=format',
  'default': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format'
};

// Helper to ensure correct image formats
function getImageUrl(subject: string, customImage?: string): string {
  if (customImage) {
    return customImage.startsWith('http') ? customImage : customImage.replace(/\.(jpg|png)$/, '.svg');
  }
  return courseImages[subject.toLowerCase()] || courseImages.default;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  // Use custom image if provided, otherwise find appropriate image based on subject
  const imageUrl = course.image || getImageUrl(course.subject);
  
  // Assign theme colors based on course ID for visual variety
  const colorClasses = [
    { bg: 'bg-[#00FFFF]', text: 'text-[#00FFFF]', border: 'border-[#00FFFF]', textOnBg: 'text-white' },
    { bg: 'bg-[#FF00FF]', text: 'text-[#FF00FF]', border: 'border-[#FF00FF]', textOnBg: 'text-white' },
    { bg: 'bg-[#FFFF00]', text: 'text-[#FFFF00]', border: 'border-[#FFFF00]', textOnBg: 'text-black' },
    { bg: 'bg-[#950713]', text: 'text-[#950713]', border: 'border-[#950713]', textOnBg: 'text-white' },
  ];
  const colorClass = colorClasses[course.id % colorClasses.length];
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#950713]/30 hover:translate-y-[-5px] h-full flex flex-col">
      <div className="relative h-40 sm:h-48">
        <Image 
          src={imageUrl}
          alt={course.title}
          fill
          className="object-cover"
        />
        {/* Gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Theme-colored accent bottom border */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 ${colorClass.bg}`}></div>
      </div>
      
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg sm:text-xl font-bold text-[#950713] hover:text-[#FF00FF] transition-colors">{course.title}</h3>
          <span className={`${colorClass.bg} ${colorClass.textOnBg} text-xs font-medium px-2 sm:px-2.5 py-0.5 rounded-full ml-1`}>
            {course.level}
          </span>
        </div>
        
        <p className="text-sm sm:text-base text-black/70 mb-3 sm:mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex justify-between items-center mt-auto pt-3 sm:pt-4">
          <span className="text-xs sm:text-sm text-[#950713]">{course.duration}</span>
          <Link 
            href="#"
            className="text-[#950713] hover:underline font-medium text-xs sm:text-sm flex items-center"
            onClick={(e) => e.preventDefault()}
          >
            Learn more
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CoursesSection() {
  const courses: Course[] = [
    {
      id: 1,
      title: 'Project Week',
      description: 'A fun week where young minds build, create, and show off their skills through exciting hands-on projects!',
      instructor: 'Jennifer Smith',
      subject: 'Technology',
      level: 'All Levels',
      duration: '1 week',
      image: '/images/project week.png'
    },
    {
      id: 2,
      title: 'Company Presentation',
      description: 'A chance for young teams to present their creative ideas, products, or services just like real companies!',
      instructor: 'Michael Johnson',
      subject: 'Entrepreneurship',
      level: 'Intermediate',
      duration: '1 day',
      image: '/images/company presentation.png'
    },
    {
      id: 3,
      title: 'YEG Challenge',
      description: 'An exciting competition where young experts solve real-world problems with creativity, teamwork, and innovation!',
      instructor: 'Sarah Wilson',
      subject: 'Innovation',
      level: 'Advanced',
      duration: '2 days',
      image: '/images/yeg challenge.png'
    },
    {
      id: 4,
      title: 'Latest on Board',
      description: 'Meet the newest young experts joining our journey of creativity and innovation!',
      instructor: 'David Thompson',
      subject: 'Community',
      level: 'Beginner',
      duration: 'Ongoing',
      image: '/images/latest on board.png'
    }
  ];
  
  return (
    <section className="relative py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-white via-[#f9fafb] to-white">
      {/* Top morphing transition */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full overflow-hidden">
        <SectionTransition
          fromColor="white"
          toColor="#f9fafb" 
          variant="wave"
          flipY={true}
          accentColor="#00FFFF"
        />
      </div>
      
      {/* Theme-colored decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#00FFFF]/10 rounded-full filter blur-xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#FF00FF]/10 rounded-full filter blur-xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10 sm:mb-16 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#950713] mb-3 sm:mb-4 relative inline-block">
            Explore Our Events
          </h2>
          <p className="text-sm sm:text-base text-black/70 max-w-2xl mx-auto">Discover our wide range of events tailored to enhance your learning journey.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {courses.map((course) => (
            <div key={course.id} className="transform transition-all duration-300 hover:scale-[1.02] course-card-hover-effect h-full">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="#"
            className="group inline-flex items-center bg-[#950713] text-white font-medium text-sm sm:text-base px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:bg-[#FF00FF] relative overflow-hidden"
            onClick={(e) => e.preventDefault()}
          >
            <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-[#00FFFF] via-[#FF00FF] to-[#FFFF00] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            <span className="relative z-10">View All Events</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Bottom morphing transition */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-[calc(100%-2px)] overflow-hidden">
        <SectionTransition
          fromColor="white"
          toColor="white"
          variant="diagonal"
          accentColor="#00FFFF"
        />
      </div>
    </section>
  );
}