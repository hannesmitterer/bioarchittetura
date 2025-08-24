#!/usr/bin/env node

/**
 * Mobile Compatibility Test Runner
 * Simple script to verify mobile functionality
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('🔍 Bioarchitettura® Mobile Compatibility Test');
console.log('==============================================\n');

// Test configuration
const tests = [
    {
        name: 'HTML Validation',
        description: 'Check HTML structure for mobile compatibility',
        test: testHTMLStructure
    },
    {
        name: 'CSS Responsive Design',
        description: 'Verify CSS responsive breakpoints',
        test: testCSSResponsive
    },
    {
        name: 'JavaScript Mobile Features',
        description: 'Test mobile navigation JavaScript',
        test: testJavaScript
    },
    {
        name: 'Performance Checks',
        description: 'Basic performance validation',
        test: testPerformance
    }
];

// Test HTML structure
async function testHTMLStructure() {
    const results = [];
    
    try {
        const indexContent = fs.readFileSync('index.html', 'utf8');
        
        // Check viewport meta tag
        if (indexContent.includes('width=device-width, initial-scale=1.0')) {
            results.push('✅ Viewport meta tag present');
        } else {
            results.push('❌ Missing proper viewport meta tag');
        }
        
        // Check semantic HTML
        if (indexContent.includes('<nav') && indexContent.includes('<main') && indexContent.includes('<header')) {
            results.push('✅ Semantic HTML structure present');
        } else {
            results.push('⚠️  Consider using more semantic HTML elements');
        }
        
        // Check mobile menu button
        if (indexContent.includes('menu-toggle') && indexContent.includes('☰')) {
            results.push('✅ Mobile menu toggle button present');
        } else {
            results.push('❌ Mobile menu toggle button missing');
        }
        
        // Check aria labels for accessibility
        if (indexContent.includes('aria-label')) {
            results.push('✅ ARIA labels present for accessibility');
        } else {
            results.push('⚠️  Consider adding ARIA labels for better accessibility');
        }
        
    } catch (error) {
        results.push(`❌ Error reading HTML files: ${error.message}`);
    }
    
    return results;
}

// Test CSS responsive design
async function testCSSResponsive() {
    const results = [];
    
    try {
        const cssContent = fs.readFileSync('styles.css', 'utf8');
        
        // Check mobile-first approach
        if (cssContent.includes('Mobile-First')) {
            results.push('✅ Mobile-first CSS approach documented');
        }
        
        // Check media queries for different breakpoints
        const mediaQueries = [
            { query: '@media (min-width: 768px)', name: 'Tablet breakpoint (768px)' },
            { query: '@media (min-width: 1024px)', name: 'Desktop breakpoint (1024px)' },
            { query: '@media (min-width: 1200px)', name: 'Large desktop breakpoint (1200px)' }
        ];
        
        mediaQueries.forEach(mq => {
            if (cssContent.includes(mq.query)) {
                results.push(`✅ ${mq.name} media query present`);
            } else {
                results.push(`❌ Missing ${mq.name} media query`);
            }
        });
        
        // Check touch-friendly features
        if (cssContent.includes('menu-toggle')) {
            results.push('✅ Mobile menu toggle styles present');
        }
        
        // Check accessibility features
        if (cssContent.includes('prefers-reduced-motion')) {
            results.push('✅ Reduced motion preference support');
        }
        
        if (cssContent.includes('focus')) {
            results.push('✅ Focus styles for keyboard navigation');
        }
        
        // Check responsive grid
        if (cssContent.includes('grid-template-columns')) {
            results.push('✅ CSS Grid layout implemented');
        }
        
    } catch (error) {
        results.push(`❌ Error reading CSS file: ${error.message}`);
    }
    
    return results;
}

// Test JavaScript mobile functionality
async function testJavaScript() {
    const results = [];
    
    try {
        // Check for JavaScript in HTML files
        const files = ['index.html', 'rivista.html', 'master.html', 'fondazione.html', 'shop.html'];
        
        for (const file of files) {
            if (fs.existsSync(file)) {
                const content = fs.readFileSync(file, 'utf8');
                
                // Check for toggle menu function
                if (content.includes('toggleMenu')) {
                    results.push(`✅ ${file}: Mobile menu toggle function present`);
                } else {
                    results.push(`⚠️  ${file}: Mobile menu toggle function missing`);
                }
                
                // Check for click outside handler
                if (content.includes('addEventListener')) {
                    results.push(`✅ ${file}: Event listeners present`);
                }
                
                // Check for resize handler
                if (content.includes('resize')) {
                    results.push(`✅ ${file}: Window resize handler present`);
                }
            }
        }
        
    } catch (error) {
        results.push(`❌ Error analyzing JavaScript: ${error.message}`);
    }
    
    return results;
}

// Test basic performance aspects
async function testPerformance() {
    const results = [];
    
    try {
        // Check file sizes
        const cssStats = fs.statSync('styles.css');
        const cssSizeKB = (cssStats.size / 1024).toFixed(1);
        
        if (cssStats.size < 50000) { // Less than 50KB
            results.push(`✅ CSS file size optimized: ${cssSizeKB}KB`);
        } else {
            results.push(`⚠️  CSS file size: ${cssSizeKB}KB (consider optimization)`);
        }
        
        // Check for external dependencies
        const indexContent = fs.readFileSync('index.html', 'utf8');
        
        // Count external resources
        const googleFonts = (indexContent.match(/fonts\.googleapis\.com/g) || []).length;
        if (googleFonts <= 2) {
            results.push(`✅ External font requests minimized: ${googleFonts}`);
        } else {
            results.push(`⚠️  Multiple external font requests: ${googleFonts}`);
        }
        
        // Check for preconnect
        if (indexContent.includes('rel="preconnect"')) {
            results.push('✅ Font preconnect optimization present');
        }
        
        // Check for CSS variables (better performance than calculations)
        const cssContent = fs.readFileSync('styles.css', 'utf8');
        if (cssContent.includes('--')) {
            results.push('✅ CSS custom properties used for better performance');
        }
        
    } catch (error) {
        results.push(`❌ Error analyzing performance: ${error.message}`);
    }
    
    return results;
}

// Run all tests
async function runTests() {
    console.log('Running mobile compatibility tests...\n');
    
    let totalPassed = 0;
    let totalTests = 0;
    
    for (const test of tests) {
        console.log(`📋 ${test.name}`);
        console.log(`   ${test.description}`);
        
        const results = await test.test();
        
        results.forEach(result => {
            console.log(`   ${result}`);
            totalTests++;
            if (result.startsWith('✅')) {
                totalPassed++;
            }
        });
        
        console.log('');
    }
    
    // Summary
    console.log('==============================================');
    console.log('📊 TEST SUMMARY');
    console.log('==============================================');
    console.log(`✅ Passed: ${totalPassed}`);
    console.log(`❌ Failed: ${totalTests - totalPassed}`);
    console.log(`📈 Success Rate: ${((totalPassed / totalTests) * 100).toFixed(1)}%`);
    
    if (totalPassed === totalTests) {
        console.log('\n🎉 All tests passed! Your site is mobile-ready.');
    } else {
        console.log('\n⚠️  Some tests failed. Please review the results above.');
    }
    
    console.log('\n📋 Next Steps:');
    console.log('1. Run automated tests with: npm run test:mobile');
    console.log('2. View detailed results: open docs/mobile-test-results.html');
    console.log('3. Test on real devices or browser dev tools');
    console.log('4. Review mobile compatibility documentation in docs/');
}

// Main execution
if (require.main === module) {
    process.chdir(path.dirname(__filename));
    runTests().catch(console.error);
}

module.exports = { testHTMLStructure, testCSSResponsive, testJavaScript, testPerformance };