export abstract class BaseClass<T> {

  constructor(data: T) {
    this.assignData(data);
  }
  protected abstract assignData(data: T): void;
  public abstract gameLoop(): void;
}
