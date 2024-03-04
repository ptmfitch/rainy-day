import { NextResponse, NextRequest } from "next/server";
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req, res) {
  
    try {
        // Access uploaded file
        const file = await req.formData();
        const pdfFile = file.get('file');
        console.log(pdfFile);

        const bytes = await pdfFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueFilename = `${Date.now()}-${pdfFile.name}`;
        const filename = join('src/uploads', uniqueFilename);
        console.log(filename);

        await writeFile(filename, buffer);
        console.log(`Saved to ${filename}`);

        // Respond with success message
        return NextResponse.json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' });
    }
}