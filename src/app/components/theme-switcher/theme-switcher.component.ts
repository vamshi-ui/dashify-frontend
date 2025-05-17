import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <!-- Theme button -->
      <button 
        (click)="toggleDropdown()" 
        class="p-2 bg-background-secondary rounded-lg flex items-center gap-2 shadow hover:shadow-md transition-all text-text">
        <span class="h-4 w-4 rounded-full" 
              [ngClass]="getThemeCircleClass()"></span>
        <span>{{ currentThemeName }}</span>
        <span class="text-sm">▼</span>
      </button>
      
      <!-- Dropdown menu -->
      <div *ngIf="isDropdownOpen" 
           class="absolute right-0 mt-2 w-48 bg-background-secondary rounded-lg shadow-lg py-1 z-10">
        <!-- System option -->
        <button 
          (click)="setTheme('system')" 
          class="w-full px-4 py-2 text-left hover:bg-background text-text flex items-center justify-between">
          <span>System</span>
          <span *ngIf="currentTheme === 'system'" class="text-primary">✓</span>
        </button>
        
        <!-- Divider -->
        <div class="border-t border-gray-200 dark:border-gray-700 my-1"></div>
        
        <!-- Theme options -->
        <button 
          *ngFor="let theme of themeService.themes"
          (click)="setTheme(theme.id)" 
          class="w-full px-4 py-2 text-left hover:bg-background text-text flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="h-3 w-3 rounded-full" 
                  [ngClass]="'bg-theme-' + theme.id"></span>
            <span>{{ theme.name }}</span>
          </div>
          <span *ngIf="currentTheme === theme.id" class="text-primary">✓</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .bg-theme-light { @apply bg-blue-500; }
    .bg-theme-dark { @apply bg-gray-700; }
    .bg-theme-purple { @apply bg-purple-500; }
    .bg-theme-forest { @apply bg-green-600; }
    .bg-theme-ocean { @apply bg-blue-800; }
    .bg-theme-sunset { @apply bg-orange-500; }
  `]
})
export class ThemeSwitcherComponent {
  currentTheme = 'system';
  isDropdownOpen = false;
  
  get currentThemeName(): string {
    if (this.currentTheme === 'system') {
      return 'System';
    }
    const theme = this.themeService.getThemeInfo(this.currentTheme);
    return theme ? theme.name : 'Theme';
  }

  constructor(public themeService: ThemeService) {
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!(event.target as HTMLElement).closest('app-theme-switcher')) {
        this.isDropdownOpen = false;
      }
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  setTheme(themeId: string): void {
    this.themeService.setTheme(themeId);
    this.isDropdownOpen = false;
  }
  
  getThemeCircleClass(): string {
    if (this.currentTheme === 'system') {
      return 'bg-gray-400';
    }
    return `bg-theme-${this.currentTheme}`;
  }
}