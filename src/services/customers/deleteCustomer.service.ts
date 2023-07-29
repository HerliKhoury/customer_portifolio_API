import { Repository } from "typeorm";
import { MyDataSource } from "../../data-source";
import { Customer } from "../../entities/customers.entity";
import { MyError } from "../../errors/myError";


export const deleteCustomerService = async (customerId: number): Promise<void> => {
    const customerRepository: Repository<Customer> = MyDataSource.getRepository(Customer)

    const customer: Customer | null = await customerRepository.findOneBy({
        id: customerId
    });

    if(!customer){
        throw new MyError("Customer not found", 404);
    }else{
        customerRepository.remove(customer);
    }
}