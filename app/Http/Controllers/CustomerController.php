<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\CustomersExport;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Writer\Csv;
use Illuminate\Http\RedirectResponse;
use App\Models\PurchaseHistory;




class CustomerController extends Controller
{


    public function index(Request $request)
    {
        // 1) อ่านคำค้น (default เป็น empty string)
        $search = $request->input('search', '');


        // 2) สร้าง query builder
        $query = Customer::query();

        // 3) ถ้ามีคำค้น ให้กรุ๊ป where ทั้งหมดเอาไว้ในวงเล็บเดียว
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('name',  'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        // 4) เรียง id ลดหลั่น ลงมา, paginate 10 หน้า, เก็บ query string (search) ไว้ให้ link หน้าอื่นด้วย
        $customers = $query
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        // 5) render ไปให้ React รับ props ชื่อ customers และ filters
        return Inertia::render('Customers/Index', [
            'customers' => $customers,
            'filters'   => ['search' => $search],
        ]);
    }



    public function create()
    {
        return Inertia::render('Customers/Create');
    }


    public function edit($id)
    {
        $customer = Customer::findOrFail($id);

        return Inertia::render('Customers/Edit', [
            'customer' => $customer
        ]);
    }

    public function show($id)
    {
        $customer = Customer::findOrFail($id);

        $purchases = $customer->purchaseHistories()
            ->with(['items.product']) // ดึงข้อมูล item และ product ด้วย
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Customers/PurchaseHistory', [
            'customer' => $customer,
            'purchases' => $purchases,
        ]);
    }



    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->update($request->only('name', 'email', 'phone', 'address'));

        return redirect()
            ->route('customers.index')
            ->with('success', 'อัปเดตข้อมูลลูกค้าเรียบร้อยแล้ว!');
    }



    public function destroy(Customer $customer)
    {
        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'ลบลูกค้าแล้ว');
    }


    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:500',
        ]);

        Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
        ]);

        return redirect()->route('customers.index')->with('success', 'เพิ่มข้อมูลลูกค้าเรียบร้อยแล้ว');
    }

    public function exportExcel()
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('A1', 'Name');
        $sheet->setCellValue('B1', 'Email');
        $sheet->setCellValue('C1', 'Phone');
        $sheet->setCellValue('D1', 'Address');

        $customers = Customer::all();
        $row = 2;

        foreach ($customers as $customer) {
            $sheet->setCellValue('A' . $row, $customer->name);
            $sheet->setCellValue('B' . $row, $customer->email);
            $sheet->setCellValue('C' . $row, $customer->phone);
            $sheet->setCellValue('D' . $row, $customer->address);
            $row++;
        }

        $writer = new Xlsx($spreadsheet);

        return response()->streamDownload(function () use ($writer) {
            $writer->save('php://output');
        }, 'customers.xlsx', [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'Content-Disposition' => 'attachment; filename="customers.xlsx"',
        ]);
    }

    public function exportCsv()
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('A1', 'Name');
        $sheet->setCellValue('B1', 'Email');
        $sheet->setCellValue('C1', 'Phone');
        $sheet->setCellValue('D1', 'Address');

        $customers = Customer::all();
        $row = 2;

        foreach ($customers as $customer) {
            $sheet->setCellValue('A' . $row, $customer->name);
            $sheet->setCellValue('B' . $row, $customer->email);
            $sheet->setCellValue('C' . $row, $customer->phone);
            $sheet->setCellValue('D' . $row, $customer->address);
            $row++;
        }

        $writer = new Csv($spreadsheet);

        return response()->streamDownload(function () use ($writer) {
            $writer->save('php://output');
        }, 'customers.csv', [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="customers.csv"',
        ]);
    }

    public function autocomplete(Request $request)
    {
        $q = $request->input('q', '');

        // ดึงเฉพาะ 10 รายการแรกเพื่อประหยัดทรัพยากร
        $items = Customer::query()
            ->where('name',  'like', "%{$q}%")
            ->orWhere('phone', 'like', "%{$q}%")
            ->limit(10)
            ->get(['id', 'name', 'phone']);

        return response()->json($items);
    }
    public function purchases(Customer $customer)
    {
        $purchases = PurchaseHistory::with(['items.product'])
            ->where('customer_id', $customer->id)
            ->latest()
            ->get();

        return Inertia::render('Customers/PurchaseHistory', [
            'customer' => $customer,
            'purchases' => $purchases,
        ]);
    }

    public function updateViaPost(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);
        $customer->update($request->only('name', 'email', 'phone', 'address'));

        return redirect()->route('customers.index')->with('success', 'อัปเดตข้อมูลลูกค้าเรียบร้อยแล้ว');
    }

    public function all()
    {
        $purchases = \App\Models\PurchaseHistory::with(['customer', 'items.product'])
            ->orderByDesc('created_at')
            ->get();

        return \Inertia\Inertia::render('Purchases/All', [
            'purchases' => $purchases,
        ]);
    }

    public function deleteViaPost($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->route('customers.index')->with('success', 'ลบลูกค้าเรียบร้อยแล้ว');
    }
}
