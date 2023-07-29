import { Repository } from "typeorm";
import { TCostumerArr } from "../../interfaces/customers.interface";
import { Customer } from "../../entities/customers.entity";
import { MyDataSource } from "../../data-source";
import { customerSchemaArr } from "../../schemas/customers.schemas";

export const catchAllCustomersService = async (): Promise<TCostumerArr> =>{
    const customerRepo: Repository<Customer> = MyDataSource.getRepository(Customer);

    const customers: TCostumerArr | null = await customerRepo.find();
    
    const customersValid: TCostumerArr = customerSchemaArr.parse(customers);

    return customersValid;
};