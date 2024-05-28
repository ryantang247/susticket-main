import {configDefaults, defineConfig} from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'

export default defineConfig(
    {
    plugins: [Vue()],

        resolve: {
            extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
            alias: {
                // This SHOULD resolve my imports, but it seems to have a problem
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
    test: {

        globals: true,
        exclude: [
            ...configDefaults.exclude,
            'tests'],
    }
})