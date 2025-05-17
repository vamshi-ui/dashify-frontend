import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from "./components/theme-switcher/theme-switcher.component";
@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule, ThemeSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  implements OnInit {
  title = 'angular-theme-switcher';
  currentTheme = 'system';
  
  constructor(private themeService: ThemeService) {}
  
  ngOnInit() {
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }
  getCurrentThemeName(): string {
    if (this.currentTheme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return `System (${isDark ? 'Dark' : 'Light'})`;
    }
    const theme = this.themeService.getThemeInfo(this.currentTheme);
    return theme ? theme.name : 'Unknown';
  }
  
  getCurrentThemeCircleClass(): string {
    if (this.currentTheme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return isDark ? 'bg-theme-dark' : 'bg-theme-light';
    }
    return `bg-theme-${this.currentTheme}`;
  }

}
