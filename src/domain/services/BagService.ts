import { Bag } from "@/domain/entities/Bag";
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
    getBagById(id: string): Bag | undefined {
        return this.bagRepository.getBagById(id);
    }

    /**
     * Get a bag by trainerId
     * @param trainerId - The id of the trainer
     */
    getBagByTrainerId(trainerId: string): (Bag | undefined)[] {
        return this.bagRepository.getBagByTrainerId(trainerId);
    }

    /**
     * Add a bag
     * @param bag - The bag to add
     */
    addBag(bag: Bag): void {
        this.bagRepository.addBag(bag);
        this.bagRepository.saveBags();
    }

    /**
     * Delete a bag
     * @param id - The id of the bag
     */
    deleteBag(id: string): void {
        this.bagRepository.deleteBag(id);
        this.bagRepository.saveBags();
    }

    /**
     * Add an item to a bag
     * @param bagId - The id of the bag
     * @param itemId - The id of the item
     */
    addItemToBag(bagId: string, itemId: string): void {
        const bag = this.getBagById(bagId);
        if (bag) {
            bag.itemIds.push(itemId);
            this.bagRepository.updateBag(bag);
            this.bagRepository.saveBags();
        }
    }

    /**
     * Remove an item from a bag
     * @param bagId - The id of the bag
     * @param itemId - The id of the item
     */
    removeItemFromBag(bagId: string, itemId: string): void {
        const bag = this.getBagById(bagId);
        if (bag) {
            bag.itemIds = bag.itemIds.filter((id) => id !== itemId);
            this.bagRepository.updateBag(bag);
        }
        this.bagRepository.saveBags();
    }

    /**
     * Add multiple items to a bag
     * @param bagId - The id of the bag
     * @param itemIds - The ids of the items
     */
    addItemsToBag(bagId: string, itemIds: string[]): void {
        const bag = this.getBagById(bagId);
        if (bag) {
            bag.itemIds.push(...itemIds);
            this.bagRepository.updateBag(bag);
        }
        this.bagRepository.saveBags();
    }
}
