
import React from 'react';
import MainLayout from '../layouts/MainLayout';

const Index = () => {
  return (
    <MainLayout>
      <div className="page-container">
        <section className="mb-16">
          <h1>About</h1>
          <p className="text-xl mb-6 text-muted-foreground">
            Hi! welcome to my personal website.
          </p>
          <div className="prose max-w-none">
            <p>
              I'm Shivanshu Kumar, a Computer Science undergrad at the <a href="https://www.iitm.ac.in/"><u>Indian Institute of Technology, Madras</u></a>
            </p>
            <p>
              I am passionate about Math, CS and biology although I have been recently exploring systems (computer architecture in particular) and security ( blockchains and decentralized finance). 
            </p>
            <p>
            	This site contains my personal views on a variety of things, some technical blogs and some educational resources I found on the way
              I believe in the power of sharing knowledge and continuous learning. Feel free to explore 
              the different sections of this website and reach out if you'd like to connect!
            </p>
          </div>
        </section>
        
        <hr />
        
        <section>
        <h2> Some cool people I met on the way :)) </h2>
       	<ul className="list-disc pl-5 space-y-2">
       	<li> <a href = "https://www.cse.iitm.ac.in/~rupesh/"><u> Prof. Rupesh Nasre</u> </a> - An amazing professor with a great sense of humour and excellent teaching skills. Had the fortune to learn Object Oriented Programming in C++ from him. </li>
       	<li> <a href = "https://www.cse.iitm.ac.in/~jayalal/"><u> Prof. Jayalal Sarma -</u> </a> One of the most supporting and down to earth Professors, ever ready to help students. Studied Algorithm design and complexity theory under him.</li>
       	<li> <a href = "https://maninarayanan.com/index.html"><u> Prof. Manikandan Narayanan</u> </a> - An extraor genius and devoted faculty. He took the Programming and Data structures class for us. </li>
       	<li> <a href = "https://rbcdsai.iitm.ac.in/people/gopalakrishnan_srinivasan/"><u> Prof. Gopalakrishnan Srinivasan </u> </a> - A cracked researcher full of enthusiasm. I hated systems until I attened his classes ;) He got me interested into architecture! </li>
       	<li> <a href = "http://hotrod46.vercel.app/"><u> Aryan Jain </u> </a> - The most determined, courageous and focussed person I ever met. He is one of my best friends at IITM, we were roommates for about an year. </li>
       	<li> <a href = "https://innocentzero.is-a.dev/"><u> Md. Isfarul Haque </u> </a> - A deeply technical, genius and supportive senior. Helped me through tons of things (In fact was built using something he suggested) </li>
       	</ul> 
       
        {/*
          <h2>Featured Content</h2>
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div className="group">
              <a href="/blog/technical" className="no-underline block border rounded-lg p-6 transition-all duration-300 hover:bg-secondary/50">
                <h3 className="text-xl mb-2">Technical Insights</h3>
                <p className="text-muted-foreground mb-0">
                  Explore technical articles covering development, design, and technology concepts.
                </p>
              </a>
            </div>
            <div className="group">
              <a href="/resources" className="no-underline block border rounded-lg p-6 transition-all duration-300 hover:bg-secondary/50">
                <h3 className="text-xl mb-2">Learning Resources</h3>
                <p className="text-muted-foreground mb-0">
                  Discover a curated collection of educational materials and helpful guides.
                </p>
              </a>
            </div>
          </div>*/}
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
