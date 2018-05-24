export abstract class BaseClass<T> {

  public reference: T;
  constructor(data: T, referenceIndex?: number) {
    this.assignData(data, referenceIndex);
  }
  protected abstract assignData(data: T, referenceIndex?: number): void;
  public abstract gameLoop(): void;
}
