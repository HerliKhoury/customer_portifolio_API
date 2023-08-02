import { Repository } from "typeorm";
import { Customer } from "../../entities/customers.entity";
import { MyDataSource } from "../../data-source";
import { TCostumer, TCostumerReq } from "../../interfaces/customers.interface";
import { customerSchema } from "../../schemas/customers.schemas";



export const createCustomer = async(customerData: TCostumerReq, loggedUserId: number): Promise<TCostumer> => {
    const customerRepo: Repository<Customer> = MyDataSource.getRepository(Customer);
    
    const newCustomer = customerRepo.create({
        ...customerData,
        user: loggedUserId
    });

    const customerEntity = await customerRepo.save(newCustomer);

    const validCustomer: TCostumer = customerSchema.parse(customerEntity);

    return validCustomer;
};