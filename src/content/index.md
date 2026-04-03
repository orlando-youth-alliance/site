---
layout: layouts/landing.njk
title: Orlando Youth Alliance
permalink: /
---

<!-- Hero -->
<section class="relative overflow-hidden">
  <div class="absolute inset-0">
    <img src="/assets/img/CoverImageOya.jpg" alt="" role="presentation" class="w-full h-full object-cover">
    <!-- [OYA-HERO] brand gradient overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/60 to-[#38c4c1]/40"></div>
  </div>
  <div class="relative px-4 py-20 sm:py-32 flex justify-center">
    <div class="bg-white/40 rounded-2xl p-6 sm:p-8 text-center w-3/4 max-w-2xl">
      <!-- [OYA-HERO] partner logos use .hero-partner-logos img for equal flex sizing -->
      <div class="hero-partner-logos flex flex-nowrap justify-center items-center gap-4 pt-6 pb-2">
        <img src="/assets/img/SYA-horizontal.png" alt="Seminole Youth Alliance">
        <img src="/assets/img/LYA-horizontal.png" alt="Lakeland Youth Alliance">
        <img src="/assets/img/OsceolaYA-logo.gif" alt="Osceola Youth Alliance">
      </div>
      <!-- [OYA-HERO] tagline strip bleeds past card padding -->
      <div class="bg-yellow-300 py-8 mt-3 text-4xl text-black">You Are Not Alone!</div>
    </div>
  </div>
</section>

<!-- Quick Links -->
<!-- [OYA-QUICKLINKS] background colors set per nth-child in CSS -->
<div class="grid grid-cols-2 md:grid-cols-4">
  <a href="/youth/"     class="flex items-center justify-center py-12 px-6 text-center text-white text-2xl font-bold no-underline hover:brightness-110 transition-all bg-[#4ecdc4]">Youth Programs</a>
  <a href="/parents/"   class="flex items-center justify-center py-12 px-6 text-center text-gray-800 text-2xl font-bold no-underline hover:brightness-110 transition-all bg-[#f7c948]">For Parents</a>
  <a href="/volunteer/" class="flex items-center justify-center py-12 px-6 text-center text-white text-2xl font-bold no-underline hover:brightness-110 transition-all bg-[#5b8dd9]">Volunteer</a>
  <a href="/donate/"    class="flex items-center justify-center py-12 px-6 text-center text-white text-2xl font-bold no-underline hover:brightness-110 transition-all bg-[#f07ec0]">Donate</a>
</div>

<!-- Home Section: Our Mission -->
<section class="px-8 py-16">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
    <div class="flex-1">
      <h2 class="text-3xl font-extrabold text-[#1e3a5f] mb-4 dark:text-white">Our Mission</h2>
      <p class="text-lg leading-relaxed mb-4">Orlando Youth Alliance (OYA) provides a safe community space for lesbian, gay, bisexual, transgender and questioning youth in Central Florida.</p>
      <a href="/mission/" class="inline-block mt-2 px-6 py-2.5 bg-[#1e3a5f] text-white font-bold rounded no-underline hover:bg-[#2d5a9e] transition-colors">Read More &rarr;</a>
    </div>
    <div class="w-full md:w-2/5 shrink-0">
      <img src="/assets/img/OurMissionHome.jpg" alt="Our Mission" class="w-full h-auto rounded-lg">
    </div>
  </div>
</section>

<!-- Home Section: Youth Programs -->
<section class="px-8 py-16">
  <div class="max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-12">
    <div class="flex-1">
      <h2 class="text-3xl font-extrabold text-[#1e3a5f] mb-4">Youth Programs</h2>
      <p class="text-lg leading-relaxed mb-4">We offer a wide range of programs and events designed to support and empower LGBTQ+ youth in our community.</p>
      <a href="/youth/" class="inline-block mt-2 px-6 py-2.5 bg-[#1e3a5f] text-white font-bold rounded no-underline hover:bg-[#2d5a9e] transition-colors">Learn More &rarr;</a>
    </div>
    <div class="w-full md:w-2/5 shrink-0">
      <img src="/assets/img/YouthHome.jpg" alt="Youth Programs" class="w-full h-auto rounded-lg">
    </div>
  </div>
</section>

<!-- Home Section: Get Involved (accent) -->
<section class="px-8 py-16 bg-[#fe7ec9] text-center">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-extrabold text-[#1e3a5f] mb-4">Get Involved</h2>
    <p class="text-lg leading-relaxed mb-4">Join us as a volunteer or supporter. Every contribution helps us create a safer, more inclusive community for LGBTQ+ youth.</p>
    <a href="/volunteer/" class="inline-block mt-2 px-6 py-2.5 bg-[#1e3a5f] text-white font-bold rounded no-underline hover:bg-[#2d5a9e] transition-colors">Volunteer &rarr;</a>
  </div>
</section>

<!-- Home Section: Donate (accent) -->
<section class="px-8 py-16 bg-[#38c4c1] text-white text-center">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl font-extrabold text-white mb-4">Support Our Work</h2>
    <p class="text-lg leading-relaxed mb-4">Your donation helps OYA continue providing vital services and safe spaces for LGBTQ+ youth in Central Florida.</p>
    <a href="/donate/" class="inline-block mt-2 px-6 py-2.5 bg-[#1e3a5f] text-white font-bold rounded no-underline hover:bg-[#2d5a9e] transition-colors">Donate Now &rarr;</a>
  </div>
</section>
