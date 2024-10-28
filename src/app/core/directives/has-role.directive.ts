import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {

  @Input() 
  set appHasRole(role: string) {
    if(this.authService.hasRole(role)){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else{
      this.viewContainerRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef, private authService: AuthenticationService) { }

}
