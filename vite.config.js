import { defineConfig } from "vite";
import path, { resolve } from 'node:path';
import * as glob from "glob";

import HtmlCssPurgePlugin from 'vite-plugin-purgecss';

function obtenerHtmlFiles() {
    return Object.fromEntries(
        glob.sync(
            './**/*.html',
            {
                ignore: [
                    './dist/**',
                    './node_modules/**'
                ]
            }
        ).map((file)=>{
            return [
                file.slice(0, file.length - path.extname(file).length), // nombre del archivo sin extensión
                resolve(process.cwd(), file) // full path a el archivo (usando process.cwd() en lugar de __dirname ya que estamos en un módulo ES)
            ]
        })
    );
}

export default defineConfig(
    {
        appType: 'mpa',
        base: '/portafolio_cesia_actualizado/',
        build: {
            rolldownOptions: {
                input: obtenerHtmlFiles()
            }
        },
        plugins: [
            HtmlCssPurgePlugin()
        ]
    }
);
