import React from 'react'

function Landing() {
  return (
    <>
    <div class="relative bg-primary pt-[120px] md:pt-[130px] lg:pt-[160px]" >
  <div class="container mx-auto">
    <div class="-mx-4 flex flex-wrap items-center">
      <div class="w-full px-4">
        <div class="hero-content text-center">
          <h1 class="mx-auto mb-5 max-w-[530px] text-4xl font-bold leading-snug text-white sm:text-[42px]">
            Ready for SaaS Websites Crafted by TailGrids
          </h1>
          <p class="mx-auto mb-8 max-w-[480px] text-base text-[#e4e4e4]">
            Example Template for SaaS, Software, and App Landing Page.
            Crafted with TailGrids UI Components by TailGrids Team
          </p>

          <ul class="flex flex-wrap justify-center">
            <li class="mx-2 mb-3 sm:mx-4">
              <a href="#" class="inline-flex items-center justify-center rounded-lg bg-white px-5 py-4 text-center text-base font-normal text-dark hover:bg-opacity-90 sm:px-10">
                Get Started Now
              </a>
            </li>
            <li class="mx-2 mb-3 sm:mx-4">
              <button class="flex items-center text-base font-medium text-white">
                <span class="mr-4 flex h-14 w-14 items-center justify-center rounded-full bg-white">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6077 6.63397C14.2743 7.01887 14.2743 7.98112 13.6077 8.36602L2.35767 14.8612C1.691 15.2461 0.857665 14.765 0.857665 13.9952L0.857666 1.00481C0.857666 0.23501 1.691 -0.246117 2.35767 0.138783L13.6077 6.63397Z" fill="#3056D3"></path>
                  </svg>
                </span>
                Play Intro Video
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-full px-4">
        <div class="relative z-10 mx-auto max-w-[845px]">
          <div class="mt-16">
            <img src="src/assets/images/hero/hero-image-05.jpg" alt="hero image" class="mx-auto max-w-full rounded-t-xl rounded-tr-xl" />
          </div>

          <div class="absolute -left-9 bottom-0 z-[-1] h-40 w-40 rounded-full bg-white opacity-10"></div>
          <div class="absolute -right-6 -top-6 z-[-1] h-40 w-40 rounded-full bg-white opacity-10"></div>
        </div>
      </div>
    </div>
  </div>

 
</div>
    </>
  )
}

export default Landing