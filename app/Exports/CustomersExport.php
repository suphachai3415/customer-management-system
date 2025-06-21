<?php


namespace App\Exports;

use App\Models\Customer;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;


class CustomersExport implements FromQuery, WithHeadings
{
    public function query()
    {
        return Customer::query()->select('name', 'email', 'phone');
    }

    public function headings(): array
    {
        return ['ชื่อ', 'อีเมล', 'เบอร์โทร'];
    }
}
