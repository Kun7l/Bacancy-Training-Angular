import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-static-page',
  imports: [RouterLink],
  templateUrl: './static-page.page.html',
  styleUrl: './static-page.page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StaticPagePage {
  private readonly route = inject(ActivatedRoute);

  protected readonly title = this.route.snapshot.data['title'] as string;
  protected readonly description = this.route.snapshot.data['description'] as string;
}