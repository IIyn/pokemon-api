import { BagRepository } from "@/infrastructure/repositories/BagRepository";

/**
 * Bag service
 * @class
 * @public
 */
export class BagService {
  private bagRepository: BagRepository;

  constructor() {
    this.bagRepository = new BagRepository();
  }

  /**
   * Get a bag by id
   * @param id - The id of the bag
   */
  getBagById(id: string): Promise<any> {
    return this.bagRepository.getBagById(id);
  }

  /**
   * Get a bag by trainerId
   * @param trainerId - The id of the trainer
   */
  getBagByTrainerId(trainerId: string): Promise<any> {
    return this.bagRepository.getBagByTrainerId(trainerId);
  }

  /**
   * Add a bag
   * @param bag - The bag to add
   */
  addBag(trainerId: string): Promise<any> {
    return this.bagRepository.addBag({
      trainerId: trainerId,
    });
  }

  /**
   * Delete a bag
   * @param id - The id of the bag
   */
  deleteBag(id: string): void {
    this.bagRepository.deleteBag(id);
  }

  /**
   * Add an item to a bag
   * @param bagId - The id of the bag
   * @param itemId - The id of the item
   */
  async addItemToBag(bagId: string, itemId: string) {
    const bag = await this.getBagById(bagId);
    if (bag) {
      this.bagRepository.addBagItem(bagId, itemId);
    }
  }

  /**
   * Remove an item from a bag
   * @param bagId - The id of the bag
   * @param itemId - The id of the item
   */
  removeItemFromBag(bagId: string, itemId: string): void {
    this.bagRepository.deleteBagItem(bagId, itemId);
  }

  /**
   * Add multiple items to a bag
   * @param bagId - The id of the bag
   * @param itemIds - The ids of the items
   */
  async addItemsToBag(bagId: string, itemIds: string[]): Promise<void> {
    const bag = await this.getBagById(bagId);
    if (bag) {
      itemIds.forEach((itemId) => {
        this.addItemToBag(bagId, itemId);
      });
    }
  }
}
