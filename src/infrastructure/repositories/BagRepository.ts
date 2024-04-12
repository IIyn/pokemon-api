import { Bag } from "@/domain/entities/Bag";
import path from "path";
import fs from "fs";

/**
 * Bag repository
 * @class
 * @public
 */
export class BagRepository {
    private bag: Bag[] = [];

    private readonly filePath = path.join(
        __dirname,
        "..",
        "data",
        "bags.json"
    );

    constructor() {
        this.bag = this.loadBags();
    }

    /**
     * Load bag from the json file
     */
    loadBags(): Bag[] {
        const data = fs.readFileSync(this.filePath, "utf-8");
        return JSON.parse(data);
    }

    /**
     * Save bag to the json file
     */
    saveBags(): void {
        fs.writeFileSync(this.filePath, JSON.stringify(this.bag, null, 2));
    }

    /**
     * Get a bag by id
     */
    getBagById(id: string): Bag | undefined {
        return this.bag.find((bag) => bag.id === id);
    }

    /**
     * Get a bag by trainerId
     */
    getBagByTrainerId(trainerId: string): (Bag | undefined)[] {
        return this.bag.map((bag) => {
            if (bag.trainerId === trainerId) {
                return bag;
            }
        });
    }

    /**
     * Add a bag
     */
    addBag(bag: Bag): void {
        this.bag.push(bag);
    }

    /**
     * Update a bag
     */
    updateBag(bag: Bag): void {
        this.bag = this.bag.map((t) =>
            t.id === bag.id ? bag : t
        );
    }

    /**
     * Delete a bag
     */
    deleteBag(id: string): void {
        this.bag = this.bag.filter((bag) => bag.id !== id);
    }
}
