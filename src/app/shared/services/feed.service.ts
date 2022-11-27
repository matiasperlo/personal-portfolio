import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private api_url = "/feed"
  constructor(
    private apiService: ApiService
  ) { }

  getFeed() {
    return this.apiService.get(this.api_url)
  }
}
