#!/usr/bin/env ts-node

// Environment checker script
import { runEnvironmentCheck } from '../src/utils/envChecker';

console.log('Starting environment validation...\n');
runEnvironmentCheck(true);
