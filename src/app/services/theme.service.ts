import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ThemeInfo {
  id: string;
  name: string;
  class: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Theme options
  themes: ThemeInfo[] = [
    { id: 'light', name: 'Light', class: 'theme-light' },
    { id: 'dark', name: 'Dark', class: 'theme-dark' },
    { id: 'purple', name: 'Purple', class: 'theme-purple' },
    { id: 'forest', name: 'Forest', class: 'theme-forest' },
    { id: 'ocean', name: 'Ocean', class: 'theme-ocean' },
    { id: 'sunset', name: 'Sunset', class: 'theme-sunset' }
  ];
  
  private currentThemeSubject = new BehaviorSubject<string>('system');
  currentTheme$ = this.currentThemeSubject.asObservable();
  
  constructor() {
    // Initialize theme from localStorage or default to system
    const savedTheme = localStorage.getItem('theme') || 'system';
    this.setTheme(savedTheme);
    
    // Watch for system theme changes
    this.watchSystemThemeChanges();
  }
  
  setTheme(themeId: string): void {
    this.currentThemeSubject.next(themeId);
    localStorage.setItem('theme', themeId);
    
    // Remove all theme classes from body
    document.body.classList.remove('dark', ...this.themes.map(t => t.class));
    
    if (themeId === 'system') {
      // Apply dark theme if system prefers dark
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.body.classList.add('dark');
      }
    } else {
      // Apply specific theme class
      const theme = this.getThemeInfo(themeId);
      if (theme) {
        document.body.classList.add(theme.class);
        
        // For dark-variants, also add the dark class
        if (themeId === 'dark' || themeId === 'ocean') {
          document.body.classList.add('dark');
        }
      }
    }
  }
  
  getThemeInfo(themeId: string): ThemeInfo | undefined {
    return this.themes.find(theme => theme.id === themeId);
  }
  
  private watchSystemThemeChanges(): void {
    // Watch for changes in system color scheme
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (this.currentThemeSubject.value === 'system') {
        document.body.classList.toggle('dark', e.matches);
      }
    });
  }
}