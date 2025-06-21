'use server';

import { generateProductDescription } from '@/ai/flows/generate-product-description';

export async function generateDescriptionAction(productName: string, keySpecifications: string): Promise<{ description?: string; error?: string }> {
  if (!productName || !keySpecifications) {
    return { error: 'Product name and key specifications are required.' };
  }

  try {
    const result = await generateProductDescription({ productName, keySpecifications });
    if (result && result.productDescription) {
        return { description: result.productDescription };
    }
    return { error: 'Failed to generate a valid description.' };
  } catch (error) {
    console.error('AI description generation failed:', error);
    return { error: 'An error occurred while generating the description.' };
  }
}
