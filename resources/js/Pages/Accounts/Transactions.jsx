import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faFilter, faTh, faList, faHeart, faCircleInfo, faCalendarDays, faStar } from '@fortawesome/free-solid-svg-icons';

import Layout from '@/Layouts/Layout';
import Accounts from '@/Layouts/Accounts/Accounts';
import { usePage } from '@inertiajs/react';

import "react-alice-carousel/lib/alice-carousel.css";
import "../../../css/style.css";
import "aos/dist/aos.css";
import "../../../css/bootstrap-datetimepicker.min.css";
import Image from "../../../../public/Images/pic-4.png";

function Transactions({ auth }) {
    return (
        
  <Layout auth={auth}>
    <Accounts>
      
          
           
               
                  <div class="col-lg-9 ">
                    
                     <h6 class="user-title">My Transactions</h6>
                     <div class="table-responsive w-full ">
                        <table class="table mb-0 custom-table w-full">
                           <thead class="thead-light">
                              <tr>
                                 <th>#</th>
                                 <th>Type</th>
                                 <th>Amount</th>
                                 <th>Date</th>
                                 <th>Payment Type</th>
                                 <th>Status</th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr>
                                 <td>1</td>
                                 <td>Wallet Topup</td>
                                 <td class="text-light-success">+$80</td>
                                 <td class="text-body">07 Oct 2023 11:22:51</td>
                                 <td class="text-body">Paypal</td>
                                 <td><span class="badge-success">Completed</span></td>
                              </tr>
                              <tr>
                                 <td>2</td>
                                 <td>Purchase</td>
                                 <td class="text-light-danger">-$20</td>
                                 <td class="text-body">06 Oct 2023 11:22:51</td>
                                 <td class="text-body">Paypal</td>
                                 <td><span class="badge-danger">Cancel</span></td>
                              </tr>
                              <tr>
                                 <td>3</td>
                                 <td>Refund</td>
                                 <td class="text-light-success">+$20</td>
                                 <td class="text-body">06 Oct 2023 11:22:51</td>
                                 <td class="text-body">Paypal</td>
                                 <td><span class="badge-success">Completed</span></td>
                              </tr>
                              <tr>
                                 <td>4</td>
                                 <td>Wallet Topup</td>
                                 <td class="text-light-success">+$100</td>
                                 <td class="text-body">03 Oct 2023 11:22:51</td>
                                 <td class="text-body">Paypal</td>
                                 <td><span class="badge-success">Completed</span></td>
                              </tr>
                              <tr>
                                 <td>5</td>
                                 <td>Purchase</td>
                                 <td class="text-light-danger">-$20</td>
                                 <td class="text-body">06 Oct 2023 11:22:51</td>
                                 <td class="text-body">Paypal</td>
                                 <td><span class="badge-danger">Cancel</span></td>
                              </tr>
                              <tr>
                                 <td>6</td>
                                 <td>Refund</td>
                                 <td class="text-light-success">+$20</td>
                                 <td class="text-body">06 Oct 2023 11:22:51</td>
                                 <td class="text-body">Paypal</td>
                                 <td><span class="badge-success">Completed</span></td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
           
         
     
        
      
</Accounts>

  </Layout>
      
    );
}
export default Transactions