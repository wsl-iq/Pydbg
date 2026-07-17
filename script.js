/*
 * Copyright (c) 2025-2026, lnc
 * All rights reserved.
 * Developer : Mohammed Al-Baqer
*/

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.overview-card, .feature-item, .syntax-item, .download-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
        
        lastScroll = currentScroll;
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 90;
                const position = target.offsetTop - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const heroStats = document.querySelectorAll('.stat-number');
    heroStats.forEach(stat => {
        const finalValue = stat.textContent;
        const isPlus = finalValue.includes('+');
        const numericValue = parseInt(finalValue);
        
        if (!isNaN(numericValue)) {
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    stat.textContent = isPlus ? numericValue + '+' : numericValue;
                    clearInterval(timer);
                } else {
                    stat.textContent = isPlus ? Math.floor(current) + '+' : Math.floor(current);
                }
            }, 30);
        }
    });
});

function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fa-solid fa-check"></i> تم النسخ';
        button.style.background = '#238636';
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('فشل النسخ:', err);
    });
}

document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            
            const card = this.closest('.download-card');
            const osName = card.querySelector('h3').textContent;
            
            const downloadingHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جاري التحميل...';
            const originalHTML = this.innerHTML;
            this.innerHTML = downloadingHTML;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fa-solid fa-check"></i> اكتمل التحميل';
                this.style.background = '#238636';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.background = '';
                }, 3000);
            }, 2000);
        }
    });
});

console.log('%c Python Reverse Engineering Suite v2.0 %c',
    'background: #0078d4; color: white; padding: 10px; font-size: 16px; border-radius: 5px 0 0 5px;',
    'background: #1a1a2e; color: white; padding: 10px; font-size: 16px; border-radius: 0 5px 5px 0;');
console.log('%c تم التطوير بواسطة محمد الباقر %c',
    'color: #0078d4; font-size: 14px;', '');