import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { RouterTestingModule } from '@angular/router/testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App,   RouterTestingModule ],
    }).compileComponents();
  });

  it('should create the app', () => {//créer une instance du composant et vérifier qu'elle est créée avec succès
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
//verifier que le titre est rendu correctement dans le template
  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent) .toContain('E-shop-gallery');
  });
});
