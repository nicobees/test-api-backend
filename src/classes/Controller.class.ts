export abstract class Controller<RouterType> {
  protected path!: string
  protected router!: RouterType

  protected setPath = (path: Controller<RouterType>['path']): Controller<RouterType>['path'] => {
    this.path = path
    return this.path
  }

  protected getPath = (): Controller<RouterType>['path'] => {
    return this.path
  }

  protected setRouter = (router: Controller<RouterType>['router']): Controller<RouterType>['router'] => {
    this.router = router
    return this.router
  }

  public getRouter = (): Controller<RouterType>['router'] => {
    return this.router
  }
}
