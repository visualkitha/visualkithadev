'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, LoaderCircle } from 'lucide-react';
import type { Equipment } from '@/lib/types';
import { generateDescriptionAction } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const formSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters.'),
  specifications: z.string().min(10, 'Specifications must be at least 10 characters.'),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
});

type EquipmentFormValues = z.infer<typeof formSchema>;

interface EquipmentFormProps {
  initialData?: Equipment | null;
  onSubmit: (data: EquipmentFormValues) => void;
  onCancel: () => void;
}

export function EquipmentForm({ initialData, onSubmit, onCancel }: EquipmentFormProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          name: initialData.name,
          specifications: initialData.specifications,
          description: initialData.description,
        }
      : {
          name: '',
          specifications: '',
          description: '',
        },
  });

  const { watch, setValue } = form;
  const productName = watch('name');
  const keySpecifications = watch('specifications');

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    const result = await generateDescriptionAction(productName, keySpecifications);
    setIsGenerating(false);

    if (result.description) {
      setValue('description', result.description, { shouldValidate: true });
      toast({
        title: 'Success',
        description: 'Product description generated.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error || 'Failed to generate description.',
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Helix Fi 2 Gateway" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="specifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Specifications</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter key specs, one per line. e.g., Wi-Fi 6, 4x4 MU-MIMO"
                      className="min-h-[150px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
                <FormLabel>AI Generated Description</FormLabel>
                <Card className="bg-secondary/50">
                    <CardHeader className="p-4">
                        <Button
                            type="button"
                            onClick={handleGenerateDescription}
                            disabled={isGenerating || !productName || !keySpecifications}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            {isGenerating ? (
                              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Wand2 className="mr-2 h-4 w-4" />
                            )}
                            Generate with AI
                        </Button>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                         <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="mt-2">
                                <FormControl>
                                  <Textarea
                                    placeholder="Click 'Generate with AI' or write your own description..."
                                    className="min-h-[118px] resize-y bg-background"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                    </CardContent>
                </Card>
            </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? 'Save Changes' : 'Create Equipment'}</Button>
        </div>
      </form>
    </Form>
  );
}
