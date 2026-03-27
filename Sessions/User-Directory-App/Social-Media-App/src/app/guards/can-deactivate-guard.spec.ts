import { CanDeactivateGuard } from './can-deactivate-guard';

describe('CanDeactivateGuard', () => {
  it('should create an instance', () => {
    const directive = new CanDeactivateGuard();
    expect(directive).toBeTruthy();
  });
});
