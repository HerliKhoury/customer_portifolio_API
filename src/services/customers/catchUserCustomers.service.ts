import { Repository } from "typeorm";
import { MyDataSource } from "../../data-source";
import { TCostumer } from "../../interfaces/customers.interface";
import { Customer } from "../../entities/customers.entity";

export const listPropertiesService = async ( 
    userId: number
): Promise<TCostumer[] | null> => {

    const propertyRepo: Repository<Customer> = MyDataSource.getRepository(Customer);
    
    const propertiesList: TCostumer[] | null = 
        await propertyRepo.createQueryBuilder("customer")
            .innerJoin("customer.user", "user") 
            .where("user.id = :userId", { userId: userId })
            .getMany();

    return propertiesList;
}